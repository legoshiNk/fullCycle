FROM golang:1.21 AS builder
WORKDIR /app
COPY main.go .

RUN go mod init fullcycle && go mod tidy

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o fullcycle

FROM golang:1.21-alpine
WORKDIR /app

COPY --from=builder /app/fullcycle /fullcycle

RUN chmod +x /fullcycle


CMD ["/fullcycle"]
