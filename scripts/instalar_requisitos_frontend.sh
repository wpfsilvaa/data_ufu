#!/bin/bash

# Função para instalar pacotes no Arch (pacman)
install_arch() {
    echo "Detectado Arch Linux. Instalando dependências..."
    sudo pacman -Syu --noconfirm nodejs npm
    cd ../FRONTEND && npm install
}

# Função para instalar pacotes no Ubuntu/Debian (apt)
install_ubuntu() {
    echo "Detectado Ubuntu/Debian. Instalando dependências..."
    sudo apt update
    sudo apt install -y nodejs npm
    cd ../FRONTEND && npm install
}

# Função para verificar a distribuição
detect_distro() {
    if [ -f /etc/os-release ]; then
        # Extraímos o nome da distribuição
        . /etc/os-release
        DISTRO_NAME=$ID
    else
        echo "Distribuição desconhecida!"
        exit 1
    fi
}

# Função principal
main() {
    detect_distro

    case $DISTRO_NAME in
        arch)
            install_arch
            ;;
        ubuntu|debian)
            install_ubuntu
            ;;
        *)
            echo "Distribuição não suportada: $DISTRO_NAME"
            exit 1
            ;;
    esac
}

# Executando o script
main
