
# API-Service-Image

Este repositório contém um serviço de API RESTful que oferece funcionalidades de processamento de imagens. A API foi projetada para lidar com diversas tarefas relacionadas a imagens, como redimensionamento, corte e aplicação de filtros, facilitando a integração em diferentes aplicações.

## Funcionalidades

- **Redimensionamento de Imagens**: Redimensione imagens para dimensões especificadas.
- **Corte de Imagens**: Corte imagens para focar em áreas específicas.
- **Aplicação de Filtros**: Aplique vários filtros em imagens, como tons de cinza, desfoque, entre outros.
- **API RESTful**: Fácil de usar e integrar com outros serviços.
- **Escalável**: Projetado para lidar com grandes volumes de requisições de processamento de imagens.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/EduardoVasconcelos11/API-Service-Image.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd API-Service-Image
   ```
3. Instale as dependências necessárias:
   ```bash
   pip install -r requirements.txt
   ```

## Uso

1. Inicie o serviço da API:
   ```bash
   python app.py
   ```
2. Utilize uma ferramenta como `curl` ou Postman para enviar requisições à API. A documentação da API estará disponível em `http://localhost:5000/docs` após iniciar o serviço.

### Exemplos de Requisições

- **Redimensionar Imagem**: Envie uma requisição `POST` para o endpoint `/resize` com os parâmetros de URL da imagem, largura e altura desejadas.

   Exemplo:
   ```bash
   curl -X POST "http://localhost:5000/resize" -H "Content-Type: application/json" -d '{
       "image_url": "https://example.com/image.jpg",
       "width": 800,
       "height": 600
   }'
   ```

- **Cortar Imagem**: Envie uma requisição `POST` para o endpoint `/crop` com os parâmetros de URL da imagem, coordenadas do corte (x, y) e dimensões.

   Exemplo:
   ```bash
   curl -X POST "http://localhost:5000/crop" -H "Content-Type: application/json" -d '{
       "image_url": "https://example.com/image.jpg",
       "x": 100,
       "y": 50,
       "width": 400,
       "height": 300
   }'
   ```

- **Aplicar Filtro**: Envie uma requisição `POST` para o endpoint `/filter` com os parâmetros de URL da imagem e o filtro desejado (por exemplo, `grayscale` para tons de cinza).

   Exemplo:
   ```bash
   curl -X POST "http://localhost:5000/filter" -H "Content-Type: application/json" -d '{
       "image_url": "https://example.com/image.jpg",
       "filter": "grayscale"
   }'
   ```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para fazer um fork do repositório e criar um pull request com suas alterações. Se encontrar algum problema, abra uma issue para que possamos melhorar o projeto.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para dúvidas ou sugestões, você pode entrar em contato pelo e-mail eduardovasconcelos110@gmail.com .

