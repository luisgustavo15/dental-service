/* ==========================================================================
   DR. JOCÉLIO — Comportamento da página
   Sem dependências externas. Tudo o que está aqui é funcional e verificável.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. WhatsApp — a única ação de conversão real do site.
        Cada botão carrega uma mensagem inicial própria, conforme o contexto.
     --------------------------------------------------------------------- */
  var WHATSAPP_NUMERO = '5588996821431';

  var MENSAGENS = {
    'hero': 'Olá! Conheci a clínica Dr. Jocélio pelo site e gostaria de obter informações sobre os tratamentos e agendar uma consulta.',
    'cta': 'Olá! Conheci a clínica Dr. Jocélio pelo site e gostaria de agendar uma avaliação.',
    'flutuante': 'Olá! Vim pelo site da clínica Dr. Jocélio e gostaria de falar com a equipe.',
    'profissional': 'Olá! Gostaria de agendar uma consulta com o Dr. Jocélio Souza.',
    'profissional-info': 'Olá! Gostaria de saber mais sobre o atendimento do Dr. Jocélio Souza.',
    'tratamento-canal': 'Olá! Gostaria de agendar uma avaliação para tratamento de canal (endodontia).',
    'tratamento-restauracao': 'Olá! Gostaria de agendar uma avaliação para restauração estética.',
    'tratamento-limpeza': 'Olá! Gostaria de agendar uma limpeza e profilaxia.',
    'tratamento-clareamento': 'Olá! Gostaria de agendar uma avaliação para clareamento dental.',
    'info-canal': 'Olá! Gostaria de informações sobre o tratamento de canal (endodontia).',
    'info-restauracao': 'Olá! Gostaria de informações sobre restauração estética.',
    'info-limpeza': 'Olá! Gostaria de informações sobre limpeza e profilaxia.',
    'info-clareamento': 'Olá! Gostaria de informações sobre clareamento dental.'
  };

  function linkWhatsApp(mensagem) {
    return 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(mensagem);
  }

  function ligarBotoesWhatsApp() {
    var botoes = document.querySelectorAll('[data-wa]');
    Array.prototype.forEach.call(botoes, function (el) {
      var chave = el.getAttribute('data-wa');
      var texto = MENSAGENS[chave] || MENSAGENS.hero;
      el.setAttribute('href', linkWhatsApp(texto));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* ---------------------------------------------------------------------
     2. Header: fundo ao rolar, barra de progresso e seção ativa
     --------------------------------------------------------------------- */
  function ligarHeader() {
    var topbar = document.getElementById('topbar');
    var progress = document.getElementById('progress');
    var toTop = document.getElementById('toTop');
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    var secoes = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    function aoRolar() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      var altura = document.documentElement.scrollHeight - window.innerHeight;
      var pct = altura > 0 ? (y / altura) * 100 : 0;

      if (topbar) topbar.classList.toggle('is-stuck', y > 12);
      if (progress) progress.style.width = pct + '%';
      if (toTop) toTop.classList.toggle('is-on', y > 700);

      var atual = secoes[0];
      secoes.forEach(function (s) {
        if (s.getBoundingClientRect().top <= 140) atual = s;
      });
      links.forEach(function (a) {
        a.classList.toggle('is-active', atual && a.getAttribute('href') === '#' + atual.id);
      });
    }

    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    aoRolar();
  }

  /* ---------------------------------------------------------------------
     3. Menu mobile
     --------------------------------------------------------------------- */
  function ligarMenu() {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (!burger || !nav) return;

    function fechar() {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('nav-open');
    }

    burger.addEventListener('click', function () {
      var aberto = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(aberto));
      burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('nav-open', aberto);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) fechar();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fechar();
    });
  }

  /* ---------------------------------------------------------------------
     4. Voltar ao topo
     --------------------------------------------------------------------- */
  function ligarVoltarAoTopo() {
    var toTop = document.getElementById('toTop');
    if (!toTop) return;
    toTop.addEventListener('click', function () {
      var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduzir ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------------------
     5. Revelação progressiva e paralaxe
     --------------------------------------------------------------------- */
  function ligarAnimacoes() {
    var alvos = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(alvos, function (el) { el.classList.add('is-in'); });
    } else {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada, i) {
          if (!entrada.isIntersecting) return;
          var el = entrada.target;
          el.style.transitionDelay = Math.min(i * 70, 320) + 'ms';
          el.classList.add('is-in');
          obs.unobserve(el);
          var fim = function (ev) {
            if (ev && ev.target !== el) return;
            el.removeEventListener('transitionend', fim);
            el.style.transitionDelay = '';
            el.removeAttribute('data-reveal');
            el.classList.add('is-revealed');
          };
          el.addEventListener('transitionend', fim);
          setTimeout(fim, 1400);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
      Array.prototype.forEach.call(alvos, function (el) { obs.observe(el); });
    }

    var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var paralla = document.querySelectorAll('[data-parallax]');
    if (reduzir || !paralla.length) return;

    var agendado = false;
    window.addEventListener('scroll', function () {
      if (agendado) return;
      agendado = true;
      window.requestAnimationFrame(function () {
        var y = window.pageYOffset;
        if (y > window.innerHeight * 1.5) { agendado = false; return; }
        Array.prototype.forEach.call(paralla, function (el) {
          var f = parseFloat(el.getAttribute('data-parallax')) || 0.1;
          el.style.transform = 'translate3d(0,' + (y * f).toFixed(2) + 'px,0)';
        });
        agendado = false;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------
     6. Inclinação suave que responde ao cursor (desktop)
     --------------------------------------------------------------------- */
  function ligarTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var alvos = document.querySelectorAll('[data-tilt]');
    Array.prototype.forEach.call(alvos, function (alvo) {
      var filho = alvo.querySelector('.scene, .prof__frame');
      if (!filho) return;

      alvo.addEventListener('mousemove', function (e) {
        var r = alvo.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        filho.classList.add('is-tilting');
        filho.style.transform =
          'rotateY(' + (x * 11).toFixed(2) + 'deg) rotateX(' + (-y * 11).toFixed(2) + 'deg)';
      });

      alvo.addEventListener('mouseleave', function () {
        filho.classList.remove('is-tilting');
        filho.style.transform = '';
      });
    });
  }

  /* ---------------------------------------------------------------------
     7. Formulário de contato
        Não existe backend neste site. O envio monta a mensagem e abre o
        WhatsApp oficial: nenhuma confirmação falsa é exibida, e o paciente
        vê exatamente o que está sendo enviado.

        As mensagens de validação e de retorno vêm de TEXTOS abaixo, que o
        pacote de idioma (script-en.js) substitui nas páginas em inglês.
     --------------------------------------------------------------------- */
  var TEXTOS = {
    consentimento: 'É necessário autorizar o contato para prosseguir.',
    revisar: 'Confira os campos destacados antes de enviar.',
    botBloqueado: 'Não foi possível enviar. Recarregue a página e tente novamente.',
    rapidoDemais: 'Aguarde um instante e envie novamente.',
    sucesso: 'Abrimos o WhatsApp com a sua mensagem pronta. Revise e toque em enviar para falar com a clínica.',
    popupBloqueado: function (href) {
      return 'O navegador bloqueou a nova aba. <a href="' + href +
        '" target="_blank" rel="noopener noreferrer">Toque aqui para abrir o WhatsApp com a sua mensagem</a>.';
    }
  };

  function texto(chave) {
    var i18n = window.DRJ_I18N;
    if (i18n && i18n[chave]) return i18n[chave];
    return TEXTOS[chave];
  }

  var REGRAS = {
    nome: function (v) {
      if (v.trim().length < 3) return 'Informe seu nome completo (mínimo 3 letras).';
      if (!/^[A-Za-zÀ-ÿ' \-.]+$/.test(v.trim())) return 'Use apenas letras, espaços, hífen e apóstrofo.';
      return '';
    },
    telefone: function (v) {
      var d = v.replace(/\D/g, '');
      if (d.length < 10 || d.length > 13) return 'Informe um telefone válido com DDD, por exemplo (88) 99999-9999.';
      return '';
    },
    email: function (v) {
      if (!v.trim()) return '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Informe um e-mail válido ou deixe o campo em branco.';
      return '';
    },
    assunto: function (v) {
      if (!v) return 'Escolha o assunto da sua mensagem.';
      return '';
    },
    mensagem: function (v) {
      if (v.trim().length < 10) return 'Escreva um pouco mais sobre o que você precisa (mínimo 10 caracteres).';
      if (v.length > 1200) return 'A mensagem está muito longa. Resuma em até 1200 caracteres.';
      return '';
    }
  };

  function ligarFormulario() {
    var form = document.getElementById('form-contato');
    if (!form) return;

    var status = document.getElementById('form-status');
    var campoCarimbo = document.getElementById('carimbo');
    var honeypot = document.getElementById('website');

    if (campoCarimbo) campoCarimbo.value = String(Date.now());

    function marcar(campo, mensagem) {
      var wrapper = campo.closest('.field') || campo.closest('.check');
      var erro = document.getElementById('erro-' + campo.id);
      if (wrapper) wrapper.classList.toggle('is-invalid', Boolean(mensagem));
      if (erro) erro.textContent = mensagem || '';
      return !mensagem;
    }

    function mensagemDe(campo) {
      var nome = campo.name;
      var i18n = window.DRJ_I18N;
      /* No pacote em inglês as FUNÇÕES vivem em DRJ_I18N.regras. */
      if (i18n && i18n.regras && typeof i18n.regras[nome] === 'function') {
        return i18n.regras[nome](campo.value);
      }
      var regra = REGRAS[nome];
      return regra ? regra(campo.value) : '';
    }

    function validarCampo(campo) {
      if (!REGRAS[campo.name] && !(window.DRJ_I18N && window.DRJ_I18N.regras && window.DRJ_I18N.regras[campo.name])) return true;
      return marcar(campo, mensagemDe(campo));
    }

    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (campo) {
      if (!REGRAS[campo.name]) return;
      campo.addEventListener('blur', function () { validarCampo(campo); });
      campo.addEventListener('input', function () {
        var wrapper = campo.closest('.field');
        if (wrapper && wrapper.classList.contains('is-invalid')) validarCampo(campo);
      });
    });

    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      status.className = 'form__status';
      status.textContent = '';

      /* Barreira 1: robôs preenchem o campo escondido. */
      if (honeypot && honeypot.value.trim() !== '') {
        status.className = 'form__status is-error';
        status.textContent = texto('botBloqueado');
        return;
      }

      /* Barreira 2: envio instantâneo — menos de 3 segundos é automação. */
      var decorrido = Date.now() - Number(campoCarimbo ? campoCarimbo.value : 0);
      if (decorrido < 3000) {
        status.className = 'form__status is-error';
        status.textContent = texto('rapidoDemais');
        return;
      }

      var valido = true;
      var primeiroInvalido = null;

      var nomes = Object.keys(REGRAS).concat(
        window.DRJ_I18N && window.DRJ_I18N.regras ? Object.keys(window.DRJ_I18N.regras) : []
      ).filter(function (n, i, arr) { return arr.indexOf(n) === i; });

      nomes.forEach(function (nome) {
        var campo = form.elements[nome];
        if (!campo) return;
        if (!validarCampo(campo)) {
          valido = false;
          if (!primeiroInvalido) primeiroInvalido = campo;
        }
      });

      var lgpd = document.getElementById('lgpd');
      if (lgpd && !lgpd.checked) {
        document.getElementById('erro-lgpd').textContent = texto('consentimento');
        valido = false;
        if (!primeiroInvalido) primeiroInvalido = lgpd;
      } else if (lgpd) {
        document.getElementById('erro-lgpd').textContent = '';
      }

      if (!valido) {
        status.className = 'form__status is-error';
        status.textContent = texto('revisar');
        if (primeiroInvalido) primeiroInvalido.focus();
        return;
      }

      var mensagem =
        'Olá! Vim pelo site da clínica Dr. Jocélio e gostaria de solicitar informações.\n\n' +
        'Nome: ' + form.elements.nome.value.trim() + '\n' +
        'Telefone: ' + form.elements.telefone.value.trim() + '\n' +
        (form.elements.email.value.trim() ? 'E-mail: ' + form.elements.email.value.trim() + '\n' : '') +
        'Assunto: ' + form.elements.assunto.value + '\n\n' +
        'Mensagem: ' + form.elements.mensagem.value.trim();

      var janela = window.open(linkWhatsApp(mensagem), '_blank', 'noopener');

      if (janela) {
        status.className = 'form__status is-ok';
        status.textContent = texto('sucesso');
      } else {
        status.className = 'form__status is-ok';
        status.innerHTML = texto('popupBloqueado')(linkWhatsApp(mensagem));
      }

      form.reset();
      campoCarimbo.value = String(Date.now());
    });
  }

  /* ---------------------------------------------------------------------
     8. Utilidades
     --------------------------------------------------------------------- */
  function marcarAno() {
    var ano = document.getElementById('ano');
    if (ano) ano.textContent = String(new Date().getFullYear());
  }

  function iniciar() {
    ligarBotoesWhatsApp();
    ligarHeader();
    ligarMenu();
    ligarVoltarAoTopo();
    ligarAnimacoes();
    ligarTilt();
    ligarFormulario();
    marcarAno();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
