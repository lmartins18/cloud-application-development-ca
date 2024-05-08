#! bin/bash
# Check if docker installed
if [ -x "$(command -v docker)" ]; then
    echo Docker installed.
else 
    echo Installing docker.
    # Add Docker's official GPG key:
    sudo apt-get -yqq update 
    sudo apt-get -yqq install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get -yqq update

    # Install docker
    sudo apt-get -yqq install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi
# REF: https://stackoverflow.com/questions/46575136/how-to-check-if-docker-is-installed-in-a-unix-shell-script