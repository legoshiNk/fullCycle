# Etapa de build
FROM golang:1.21 AS builder
WORKDIR /app

# Copiar o código fonte
COPY main.go .

# Inicializa o módulo Go e instala dependências
RUN go mod init fullcycle && go mod tidy

# Compila um binário estático sem dependências externas
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o fullcycle

# Imagem final mínima
FROM scratch
WORKDIR /app

# Copia apenas o binário compilado da etapa de build
COPY --from=builder /app/fullcycle /fullcycle

# Define o comando de execução
CMD ["/fullcycle"]
