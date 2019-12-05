
</br>
</br>
</br>

Let's discuss the conceptual model of Git, so the following commands make sense. There are three discrete compartments 
that files can reside in: the working directory, the staging area, and the repository. 

## The Working Directory
This is the browsable set of files that resides in the project directory at the current moment. These files can be swapped out 
for another set of files if certain Git commands are invoked. For example, Git is used to keep a record of file history
from the time that the Git repository was initialized. The user can browse the files at any point in the history using the command, 

```
git checkout <commit>
```

This replaces all of the files in the working directory with those that were saved in the history
at the point of `<commit>`.

</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/working_directory_and_staging_area.png">

</br>
</br>

</br>
</br>

## The Staging Area

This is the compartment where files are placed or removed from right before they're committed. Committing is like packing
all of the newly created and altered files into a box for safe keeping. Generally there is some sort of central theme for
each commit, so we place the files relevant to a specific contribution in the staging area before packing them into a commit.
The staging area is the place to get organized.

If a file isn't ever placed in the staging area, it's an untracked file. This means that it won't show up in the history of
the project.

</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/load_commit_for_warehouse.png">

</br>
</br>
</br>
</br>

## The Repository
The repository is like a warehouse full of commits. It contains all the persistent contributions made to the project. Git makes it easy
to download, change, and share files by packaging them all up into a repository, or repo.
Run the command:

```
git init
``` 

in a project directory to initialize it as a Git repository. Notice that before the init command is run,
the `.git` directory does not exist. Use the command:

```
ls -la
```

to see the file, since it is hidden (prefixed with `.`).The init command 
creates the `.git` directory which contains all of the commits created, as well as most of the other data Git needs 
in order to function.


<img class="article-image" src="/static/article_images/repository_warehouse.png">

</br>
</br>
</br>
</br>

## Commands
Git offers a suite of commands that are used to move files from one of the conceptual compartments to another.

Using the command,

```
git status
```

the user can see which files are in the staging area, which are unstaged, and which 
are untracked. The command:

```
git diff
```

shows what exactly has changed in the files that haven't been
staged yet. Technically, this is the difference between the repository and 
tracked files that have not been added to the staging area yet.
Use the `j` and `k` keys to scroll down and up respectively in `git diff`. 

</br>
</br>

To see the changes between staged files and the repository, 
use the command: 

```
git diff --cached
```

</br>
</br>
</br>

### The working directory and the staging area
Here are some commands that move files between the staging area and the working directory.

```
git add <file>
``` 

This moves a file into the staging area, preparing it to be committed.
Sometimes all the changes that have been made should be committed. In that case, use the command: 

```
git add .
```

To unstage a file, use the command:  

```
git reset HEAD <file>
```

</br>
</br>
</br>

### Making Commits

In order to save the staging area in the repository, the files must be committed. Use the command:
 
```
git commit -m "<message>"
```

Every commit should have a message attached to it, so one can browse the repository later on and understand
the changes that were made in each commit without actually having to open them up. This is like labeling the boxes in a 
warehouse. Imagine how difficult and inefficient it would be to search through an entire warehouse full of boxes to 
find an old book when you could just search for the location of the box with a label of "Old Books". This is why
commit messages should be descriptive.

</br>
</br>
</br>


## Conclusion
These are the core commands that Git is built around. Next, interactions between the local repository and remote repositories,
e.g. Github, will be covered.
