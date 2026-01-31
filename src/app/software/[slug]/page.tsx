'use client';
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getRepoReadme(owner: string, repo: string) {
  const { data } = await octokit.repos.getReadme({
    owner,
    repo,
    mediaType: {
      format: "html",
    },
  });
  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Define the repositories for your software projects
  const repos: { [key: string]: { owner: string; repo: string } } = {
    "risc-v-simulator": { owner: "yousifnazhat", repo: "riscv-pipeline-simulator" },
    "election-engine": { owner: "yousifnazhat", repo: "election-data-analyzer" },
    "unix-fs-emulator": { owner: "yousifnazhat", repo: "filesystem-emulator" },
    "128-bit-toolkit": { owner: "yousifnazhat", repo: "128-bit-arithmetic-toolkit" },
    "symbiote-host-compatibility-tree": { owner: "yousifnazhat", repo: "symbiote-host-compatibility-tree" },
  };

  const { slug } = params;
  const repoInfo = repos[slug];

  if (!repoInfo) {
    return <div>Project not found</div>;
  }

  const readmeHtml = await getRepoReadme(repoInfo.owner, repoInfo.repo);

  return (
    <div className="prose dark:prose-invert max-w-none p-8">
      <div dangerouslySetInnerHTML={{ __html: readmeHtml as unknown as string }} />
    </div>
  );
}
