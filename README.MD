 - criar models
 - criar casos de uso
 - criar testes
 - criar repositórios
 - verificar um projeto já pronto para consulta
 - criar uma boa documentação
 - postar no linkedin
 - swagger


 ### Regras da aplicação
- Deve ser possível criar um usuário
- Deve ser possível identificar o usuário entre as requisições
- Deve ser possível registrar uma refeição feita, com as seguintes informações:
    
    *As refeições devem ser relacionadas a um usuário.*
    
[X] - Nome
[X] - Descrição
[X] - Data e Hora
[X] - Está dentro ou não da dieta
- Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- Deve ser possível apagar uma refeição
- Deve ser possível listar todas as refeições de um usuário
- Deve ser possível visualizar uma única refeição
- Deve ser possível recuperar as métricas de um usuário
    *As métricas serão retornadas pela própria api em dados diferentes*
    [X] - Quantidade total de refeições registradas
    [X] - Quantidade total de refeições dentro da dieta
    [X] - Quantidade total de refeições fora da dieta
    [X] - Melhor sequência de refeições dentro da dieta
- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou