
# Frontend (React) Project

## 1. Cloning the Repository
To start working on the frontend project, first clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/library-management-frontend.git
cd library-management-frontend
```

## 2. Install Dependencies
Before you start working, ensure all dependencies are installed. Run:

```bash
npm install
```

## 3. Create a Feature Branch
All changes should be made on a new feature branch, **never directly on the `main` branch**. To create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

## 4. Make Your Changes
Work on your feature as required. Make sure to frequently commit your changes:

```bash
git add .
git commit -m "Describe your changes"
```

## 5. Push to Remote Repository
Once you're ready to push the changes:

```bash
git push origin feature/your-feature-name
```

## 6. Submit a Pull Request
After pushing your feature branch, create a pull request (PR) on GitHub to merge your changes into the `main` branch.

- Navigate to the repository on GitHub.
- Click **New Pull Request**.
- Choose the **main** branch as the base and **your feature branch** as the compare.
- Provide a description of your changes.
- **Add reviewers** by selecting team members from the right-hand side.
- Submit the pull request.

## 7. Addressing Review Comments
If a reviewer requests changes, update your code, commit the changes, and push them to the same feature branch. New commits will **dismiss previous approvals**, so reviewers must reapprove your changes.

```bash
git add .
git commit -m "Address reviewer comments"
git push origin feature/your-feature-name
```

## 8. Merging into `main`
Once the PR has received all required approvals and the CI pipeline has passed, the PR can be merged into `main`. You cannot directly push to `main`; the merge must be done through the PR process.

## Handling Merge Conflicts
If your PR has merge conflicts with the `main` branch, you will need to rebase your branch onto `main` and resolve conflicts:

```bash
git fetch origin
git rebase origin/main
# Resolve conflicts in the indicated files
git add <file_with_conflict>
git rebase --continue
git push --force-with-lease
```

The `--force-with-lease` is important to ensure that you do not overwrite changes others have made.

## What Happens When You Push Code to a Branch

1. **Feature Branch**: 
   When you push code to a feature branch, the CI pipeline runs automatically on GitHub to check if the code builds successfully and passes any tests or checks defined. For the frontend, the build artifact is uploaded as part of the pipeline.

2. **Pull Request Review**:
   After pushing to a feature branch, the code cannot be merged into `main` until a pull request is reviewed and approved by the designated reviewers. Any new commits invalidate the prior approval, and the new commit must be reapproved.

3. **Merging to Main**:
   After all approvals and successful pipeline runs, the feature branch can be merged into `main`. This is done through the pull request and **cannot** be done by pushing directly to `main`.

## Managing Reviews and Approvals

- **Adding Reviewers**: In GitHub, you can select reviewers in the pull request interface under "Reviewers" on the right-hand side. A reviewer will need to approve the PR before it can be merged.
  
- **Requiring Approvals**: Ensure that each PR has the necessary number of approvals (as specified in branch protection rules). If new commits are pushed, approvals are reset, and the most recent commit must be approved again.
