import { NextResponse } from "next/server";

type GitHubRepository = {
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
};

type ContributionDay = {
  contributionCount: number;
  date: string;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
};

export async function GET() {
  try {
    const username =
      process.env.GITHUB_USERNAME?.trim();

    const token =
      process.env.GITHUB_TOKEN?.trim();

    if (!username) {
      return NextResponse.json(
        {
          error: "GITHUB_USERNAME is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (!token) {
      return NextResponse.json(
        {
          error: "GITHUB_TOKEN is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const [profileResponse, repositoriesResponse] =
      await Promise.all([
        fetch(
          `https://api.github.com/users/${encodeURIComponent(
            username
          )}`,
          {
            headers,
            next: {
              revalidate: 3600,
            },
          }
        ),

        fetch(
          `https://api.github.com/users/${encodeURIComponent(
            username
          )}/repos?per_page=100&sort=updated`,
          {
            headers,
            next: {
              revalidate: 3600,
            },
          }
        ),
      ]);

    if (!profileResponse.ok) {
      throw new Error(
        `Unable to load GitHub profile: ${profileResponse.status}`
      );
    }

    if (!repositoriesResponse.ok) {
      throw new Error(
        `Unable to load GitHub repositories: ${repositoriesResponse.status}`
      );
    }

    const profile = await profileResponse.json();

    const repositories =
      (await repositoriesResponse.json()) as GitHubRepository[];

    const ownedRepositories = repositories.filter(
      (repository) => !repository.fork
    );

    const stars = ownedRepositories.reduce(
      (total, repository) =>
        total + repository.stargazers_count,
      0
    );

    const forks = ownedRepositories.reduce(
      (total, repository) =>
        total + repository.forks_count,
      0
    );

    const graphQuery = `
      query GitHubContributionCalendar($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const graphResponse = await fetch(
      "https://api.github.com/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: graphQuery,
          variables: {
            username,
          },
        }),
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!graphResponse.ok) {
      throw new Error(
        `Unable to load contribution graph: ${graphResponse.status}`
      );
    }

    const graphResult =
      (await graphResponse.json()) as GitHubGraphQLResponse;

    if (graphResult.errors?.length) {
      throw new Error(
        graphResult.errors[0].message
      );
    }

    const contributionCalendar =
      graphResult.data?.user?.contributionsCollection
        .contributionCalendar;

    return NextResponse.json({
      profile: {
        username: profile.login,
        name: profile.name,
        avatarUrl: profile.avatar_url,
        profileUrl: profile.html_url,
        followers: profile.followers,
        publicRepositories: profile.public_repos,
      },

      totals: {
        stars,
        forks,
        contributions:
          contributionCalendar?.totalContributions ??
          0,
      },

      weeks:
        contributionCalendar?.weeks ?? [],
    });
  } catch (error) {
    console.error(
      "GitHub statistics error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load GitHub statistics.",
      },
      {
        status: 500,
      }
    );
  }
}