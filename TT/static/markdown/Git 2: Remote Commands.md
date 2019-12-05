
<div style="height: 10em;"></div>

Git was built for sharing and collaboration. Remote repositories are the basis for these functions. 
In this article, some fundamental remote commands will be explained to enable you to interact with Github
and other Git hosting services.


# Git Clone
Cloning a repository, in basic terms is just copying a repository. If the source repository is on a different
machine, it will be downloaded onto the one that invoked the command. This command instantiates a local
repository, just as `git init` does, but populates it with all of the files from the source repository.

```
git clone <source url>
```

After running this command, a directory with the name of the repository will be created which contains a `.git`
directory as well as the files contained in the repo.


<div style="height: 10em;"></div>

# Git Remote -v
Part of the reason Git is useful is because, using Git, code can be safely stored on remote machines with high reliability.
Each repository keeps a list of sources, controlled by the user, on which other clones of the repository lie.
These remote repositories can be uploaded to using Git to store newly edited or created files, and they can be downloaded 
from to update a local repo.

Github is the most prominent Git service company. They run a TON of servers for users to store remote repositories on. 

```
git remote -v
```

Run this command within a Git repository to list all of the remote sources associated with the repo. If this command is
run after a clone, there should already be a source named origin. Git automatically adds this for you when the repo is 
downloaded and initialized by the `git clone` command.

If the repository was initialized locally, then this list will be empty.

</br>
</br>
</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/Server Rack.png">

</br>
</br>
</br>


<div style="height: 10em;"></div>

# Git Remote add
To add a remote source to a local repository, use the command:

```
git remote add <source name> <source url>
```

The `<source name>` argument is an arbitrary identifier for the url that follows it. This way, if multiple 
remote sources are associated with the local repo, the user can distinguish between them. Oftentimes, there is only
one remote source associated the local repo, and it is convention to call it `origin`. 

<div style="height: 10em;"></div>

# Git Pull
After a repository has been cloned from a remote server, the local copy can be updated by downloading the new commits on the
remote repo. This command also merges the new changes into the local repo, so it should be used with caution.
Generally when working collaboratively on a certain set of files, it is more desirable to use `git fetch`, shown below.
In the case that the user is the only one working on a set of files, `git pull` is perfectly safe.

```
git pull <source name> <branch>
```

</br>
</br>
</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/git pull.png">

</br>
</br>
</br>

<div style="height: 10em;"></div>

# Git Fetch
This command simply downloads the new commits of a remote repo to the local repo. It does not update the working 
directory. That means that other commands must be used to see these changes. These commands will be covered in the 
article, "Git 3: Local Commands".

```
git fetch <source name> <branch>
```

<div style="height: 10em;"></div>

# Git Push
After making new commits, they can be "pushed" to update the remote repository. This uploads the new changes made
since the last synchronization with the remote repository, whether that be a `git pull` or a `git push`.

```
git push <source name> <branch>
```

</br>
</br>
</br>
</br>
</br>
</br>

<img class="article-image" src="/static/article_images/git push.png">

</br>
</br>
</br>

<div style="height: 10em;"></div>

## Conclusion
These commands enable users to work collaboratively on projects, a requirement in software engineering. Next, 
an article covering essential commands that will make the daily Git workflow a breeze is in order.
