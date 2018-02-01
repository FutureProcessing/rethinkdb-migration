# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.9.0"

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
    v.memory = 256
  end

  config.vm.box = "ubuntu/xenial64"
  config.vm.box_check_update = false

  config.vm.network "private_network", ip: "192.168.10.30"

  config.vm.provision "shell", path: "./scripts/vagrant/provision.sh"
  config.vm.provision "shell", path: "./scripts/vagrant/run.sh", run: "always"
end