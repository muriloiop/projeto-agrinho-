let pessoas = [];
let chamas = [];

function setup() {
  createCanvas(900, 600);
  // Cria pessoas
  for (let i = 0; i < 6; i++) {
    pessoas.push(new Pessoa(150 + i * 100, 450));
  }
  // Cria chamas da fogueira
  for (let i = 0; i < 40; i++) {
    chamas.push(new Fogo(width / 2, height - 100));
  }
}

function draw() {
  background(30, 30, 120);

  desenhaCenario();
  desenhaBandeirinhas();

  // Pessoas
  for (let p of pessoas) {
    p.dancar();
    p.mostrar();
  }

  // Fogueira
  for (let i = chamas.length - 1; i >= 0; i--) {
    chamas[i].atualizar();
    chamas[i].mostrar();
    if (chamas[i].acabou()) {
      chamas.splice(i, 1);
      chamas.push(new Fogo(width / 2, height - 100));
    }
  }
}

// ==== Cenário ====
function desenhaCenario() {
  // Campo (esquerda)
  fill(34, 139, 34); // verde
  rect(0, 400, width / 2, 200);

  fill(139, 69, 19); // terra
  ellipse(150, 500, 60, 40); // galinha simples
  fill(255);
  ellipse(145, 495, 20, 20); // corpo
  ellipse(150, 490, 10, 10); // cabeça
  fill(255, 0, 0);
  triangle(155, 490, 160, 492, 155, 494); // bico

  fill(50, 205, 50);
  rect(50, 350, 40, 80); // árvore
  fill(0, 100, 0);
  ellipse(70, 340, 80, 80); // copa

  // Cidade (direita)
  fill(60);
  rect(width / 2, 300, 80, 200);
  rect(width / 2 + 100, 350, 60, 150);
  rect(width / 2 + 180, 320, 50, 180);
  fill(255, 255, 0);
  for (let i = width / 2 + 10; i < width - 20; i += 20) {
    rect(i, 330, 5, 10); // janelas
  }
}

// ==== Bandeirinhas ====
function desenhaBandeirinhas() {
  let cores = ['red', 'yellow', 'blue', 'green', 'orange'];
  for (let i = 0; i < width; i += 40) {
    fill(random(cores));
    triangle(i, 50, i + 20, 70, i - 20, 70);
  }
}

// ==== Classe Pessoa ====
class Pessoa {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mover = random(0.02, 0.05);
  }

  dancar() {
    this.y += sin(frameCount * this.mover) * 0.5;
  }

  mostrar() {
    fill(255, 200, 200);
    ellipse(this.x, this.y - 60, 20); // cabeça
    fill(255, 100, 100);
    rect(this.x - 10, this.y - 50, 20, 30); // corpo
    line(this.x, this.y - 20, this.x - 10, this.y); // perna esquerda
    line(this.x, this.y - 20, this.x + 10, this.y); // perna direita
    line(this.x, this.y - 40, this.x - 15, this.y - 30); // braço esq
    line(this.x, this.y - 40, this.x + 15, this.y - 30); // braço dir
    fill(255, 255, 0);
    triangle(this.x - 10, this.y - 65, this.x + 10, this.y - 65, this.x, this.y - 80); // chapéu
  }
}

// ==== Classe Fogo ====
class Fogo {
  constructor(x, y) {
    this.pos = createVector(x + random(-20, 20), y + random(-10, 10));
    this.vel = createVector(random(-0.5, 0.5), random(-2, -1));
    this.alpha = 255;
    this.cor = color(255, random(100, 200), 0);
  }

  atualizar() {
    this.pos.add(this.vel);
    this.alpha -= 3;
  }

  mostrar() {
    noStroke();
    fill(this.cor.levels[0], this.cor.levels[1], this.cor.levels[2], this.alpha);
    ellipse(this.pos.x, this.pos.y, 10);
  }

  acabou() {
    return this.alpha < 0;
  }
}
