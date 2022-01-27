Instruction - How to merge your working branch into main:
It happens when your work on your own branch is done.
1. checkout to your own branch, commit all changes, sync
2. create pull request
3. find a team mate, goto github.com, in the repo, accept the pull request and review the conflict together if necessary.
4. delete the branch you worked on, locally and remotely.
5. checkout to main branch, fetch & pull and update your local main branch.

About dependencies update:
After your pulled the main branch, use "npm install" in the frontend directory to keep your local dependencies to be always updated.

Backend package:
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 6.0.1
