/* ==========================================================================
   DR. JOCÉLIO — English language pack
   Loaded after script.js on the /en/ pages only. It replaces the Portuguese
   form validation messages and status lines with their English equivalents.
   The WhatsApp messages themselves stay in Portuguese on purpose: the clinic
   team reads and answers in Portuguese.
   ========================================================================== */
(function () {
  'use strict';

  /* Portuguese messages sent on the clinic's behalf are not translated —
     only the interface text the visitor reads is. */
  window.DRJ_I18N = {
    regras: {
      nome: function (v) {
        if (v.trim().length < 3) return 'Please enter your full name (at least 3 characters).';
        if (!/^[A-Za-zÀ-ÿ' \-.]+$/.test(v.trim())) return 'Use letters, spaces, hyphens and apostrophes only.';
        return '';
      },
      telefone: function (v) {
        var d = v.replace(/\D/g, '');
        if (d.length < 10 || d.length > 13) return 'Please enter a valid phone number with area code, for example +55 88 99999-9999.';
        return '';
      },
      email: function (v) {
        if (!v.trim()) return '';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Please enter a valid e-mail address, or leave the field empty.';
        return '';
      },
      assunto: function (v) {
        if (!v) return 'Please choose a subject for your message.';
        return '';
      },
      mensagem: function (v) {
        if (v.trim().length < 10) return 'Please tell us a little more about what you need (at least 10 characters).';
        if (v.length > 1200) return 'Your message is too long. Please shorten it to 1200 characters.';
        return '';
      }
    },
    consentimento: 'You must authorise contact in order to continue.',
    revisar: 'Please check the highlighted fields before sending.',
    botBloqueado: 'Could not send. Please reload the page and try again.',
    rapidoDemais: 'Please wait a moment and send again.',
    sucesso: 'We opened WhatsApp with your message ready. Review it and tap send to reach the clinic.',
    popupBloqueado: function (href) {
      return 'Your browser blocked the new tab. ' +
        '<a href="' + href + '" target="_blank" rel="noopener noreferrer">Tap here to open WhatsApp with your message</a>.';
    },
    campos: {
      nome: 'nome',
      telefone: 'telefone',
      email: 'email',
      assunto: 'assunto',
      mensagem: 'mensagem'
    }
  };
})();
