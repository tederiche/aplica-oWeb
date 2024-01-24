const frasesEmocionais = {
    "frases_emocionais": {
      "trabalho": [
        "Hoje é o dia perfeito para alcançar novas conquistas profissionais!",
        "Cada desafio no trabalho é uma oportunidade de crescimento pessoal e profissional.",
        "A dedicação ao trabalho é a chave para o sucesso.",
        "Meu esforço hoje é o investimento no meu sucesso de amanhã.",
        "A paixão pelo que faço alimenta a minha motivação no trabalho.",
        "Cada tarefa concluída é um passo em direção aos meus objetivos profissionais.",
        "Alcançar excelência profissional através do contínuo desenvolvimento de habilidades e conhecimentos.",
        "Contribuir para o crescimento da equipe, promovendo um ambiente de trabalho positivo e colaborativo.",
        "Buscar constantemente novos desafios que me permitam crescer e evoluir na minha carreira.",
        "Atingir metas mensuráveis que demonstrem meu impacto positivo no sucesso da organização.",
        "Desenvolver liderança inspiradora, motivando e capacitando os membros da equipe a alcançarem seu melhor desempenho.",
        "Inovar e implementar soluções criativas para desafios profissionais, contribuindo para a inovação da empresa.",
        "Cultivar relacionamentos profissionais sólidos e construtivos para alcançar objetivos em equipe.",
        "Manter um equilíbrio saudável entre desafios profissionais e crescimento pessoal, promovendo bem-estar.",
        "Ser reconhecido como um profissional confiável e comprometido, sempre superando as expectativas.",
        "Promover a aprendizagem contínua, buscando oportunidades de desenvolvimento profissional que impulsionem minha carreira."
      ],
      "objetivos": [
        "Meus objetivos são a bússola que guia meu caminho.",
        "A determinação é o combustível que me impulsiona na busca dos meus objetivos.",
        "A persistência é a chave para superar os desafios e atingir meus objetivos.",
        "Cada pequeno passo me aproxima mais dos meus grandes objetivos.",
        "Visualizo meus objetivos, acredito neles e trabalho para transformá-los em realidade.",
        "Os obstáculos são apenas oportunidades disfarçadas. Estou determinado a alcançar meus objetivos.",
        "Cultivar relacionamentos significativos e saudáveis que contribuam para meu crescimento pessoal.",
        "Buscar constantemente o autoconhecimento e o desenvolvimento pessoal em todas as áreas da minha vida.",
        "Alcançar um equilíbrio harmonioso entre trabalho, família e lazer para uma vida plena.",
        "Contribuir para a comunidade e causas sociais, deixando um impacto positivo no mundo.",
        "Manter um estilo de vida saudável, priorizando o bem-estar físico e mental.",
        "Explorar novas experiências e culturas para expandir meus horizontes e enriquecer minha vida.",
        "Estabelecer metas financeiras que proporcionem segurança e liberdade para realizar sonhos.",
        "Desenvolver habilidades de empatia e compaixão para fortalecer conexões interpessoais.",
        "Aprender a lidar eficientemente com desafios e transformá-los em oportunidades de crescimento.",
        "Viver de acordo com meus valores e princípios, construindo uma vida autêntica e significativa."
      ]
    }
  };

  function criarParagrafo(categoria, quantidade) {
    const frases = frasesEmocionais.frases_emocionais[categoria];
    const selecionadas = [];
    
    for (let i = 0; i < Math.min(quantidade, frases.length); i++) {
      const indiceAleatorio = Math.floor(Math.random() * frases.length);
      selecionadas.push(frases[indiceAleatorio]);
    }

    return selecionadas.join(" ");
  }

  // Função para exibir o parágrafo no elemento com id "resultado" ao carregar a página
  window.onload = function() {
    const paragrafoTrabalho = criarParagrafo('trabalho', 1);
    const paragrafoObjetivos = criarParagrafo('objetivos', 1);
    
    document.getElementById("paragrafoTrabalho").innerText = paragrafoTrabalho;
    document.getElementById("paragrafoObjetivos").innerText = paragrafoObjetivos;
  };