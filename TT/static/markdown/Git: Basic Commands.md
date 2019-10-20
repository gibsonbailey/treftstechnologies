Let's discuss the conceptual model of Git. There are three discrete compartments that files can reside in: the working
directory, the staging area, and the repository. 

## The Working Directory
This is the set of files that resides in the project directory at the current moment. These files can be swapped out 
for another set of files if certain Git commands are invoked. For example, Git is used to keep a record of file history
from the time that the Git repository was initialized. The user can browse the files at any point in the history using the
`git checkout <commit>` command. This replaces all of the files in the working directory with those that were saved in the history
at the point of `<commit>`.

## The Staging Area
This is the compartment where files are placed or removed from right before they're committed. Committing is like packing
all of the newly created and altered files into a box for safe keeping. Generally there is some sort of central theme for
each commit, so we place the files relevant to a specific contribution in the staging area before packing them into a commit.

If a file isn't ever placed in the staging area, it's an untracked file. This means that it won't show up in the history of
the project.

## The Repository
The repository is like a warehouse full of commits. It contains all the contributions made to the project. Git makes it easy
to download, change, and share files by packaging them all up into a repository, or repo.
Run `git init` in a project directory to activate it as a Git repository. Notice that before the init command is run,
the `.git` directory does not exist. Use `ls -la` to see the file, since it is hidden (prefixed with a `.`).The init command 
creates this directory which will contain all of the commits created, as well as most of the other data Git needs to run.


## Commands
Git offers a suite of commands that are used to move files from one compartment to another.

Using the `git status` command, the user can see what is in the staging area, what is not, and what 
is currently untracked. The `git diff` command shows what exactly has changed in the files that haven't been
staged yet. Use the `j` and `k` keys to scroll down and up respectively in `git diff`. To see the changes made to
the files that have already been staged, use the `git diff --cached` command.

### The working directory and the staging area
Here are two commands that move in and out of the staging area from the working directory.

# Working Directory and Staging Area Graphic
`git add <file>` moves a file into the staging area, preparing it to be committed.
If it is desired to commit all the changes that have been made, including modifying files, creating files, 
and deleting files, use the `git add .` command.

To remove files from the staging area, use the command, `git reset HEAD <file>`. This command will be further explained
in a future article.

# Staging Area to Repository Graphic
In order to save the staging area in the repository, the files must be committed. Use the command `git commit -m 
"<message>"`. Every commit should have a message attached to it, so one can browse the repository later on and understand
the changes that were made in each commit without actually having to open them up. This is like labeling the boxes in a 
warehouse. Imagine how difficult and inefficient it would be to search through an entire warehouse full of boxes to 
find an old book when you could just search for the location of the box with a label of "Old Books".

## Conclusion
These are the core commands that Git is built around. Next, interactions between the local repository and remote repositories
(Github) will be covered.
