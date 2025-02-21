#!/bin/bash

# Função para instalar pacotes no Arch (pacman)
install_arch() {
    echo "Detectado Arch Linux. Instalando dependências..."
    sudo pacman -Syu --noconfirm postgresql
    sudo su -l postgres -c "initdb --locale=C.UTF-8 --encoding=UTF8 -D '/var/lib/postgres/data'"
    sudo systemctl start postgresql.service
    cd ../BACKEND && python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
}

# Função para instalar pacotes no Ubuntu/Debian (apt)
install_ubuntu() {
    echo "Detectado Ubuntu/Debian. Instalando dependências..."
    sudo apt update
    sudo apt install -y postgresql
    sudo su -l postgres -c "initdb --locale=C.UTF-8 --encoding=UTF8 -D '/var/lib/postgres/data'"
    sudo systemctl start postgresql.service
    cd ../BACKEND && python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
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

echo "Lembre-se de configurar o arquivo .env com os seguintes termos:"
echo "DB_NAME=data_ufu"
echo "DB_HOST=localhost"
echo "DB_USER=SEU USUARIO"
echo "DB_PASSWORD=SENHA DO SEU USUARIO"

