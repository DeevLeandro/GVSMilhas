// Resend.js - Versão direta com API do Resend
export async function sendEmail(formData) {
  // CORS-friendly usando Resend direct API
  const RESEND_API_KEY = 're_FpE1JMYZ_4UYTJ8KZLTLG3ST6GvtztCY4';
  
  // Montar HTML do email (sua função buildEmailHTML)
  const buildEmailHTML = (f) => {
    const row = (label, value) =>
      value
        ? `<tr>
            <td style="padding:6px 12px 6px 0;font-size:13px;color:#888;white-space:nowrap;vertical-align:top">${label}</td>
            <td style="padding:6px 0;font-size:13px;color:#1a1a1a">${value}</td>
           </tr>`
        : '';

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Georgia',serif">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px">
        <table width="600" cellpadding="0" cellspacing="0"
              style="background:#fff;border-radius:4px;overflow:hidden;
                      box-shadow:0 2px 12px rgba(0,0,0,0.08)">
          <tr>
            <td style="background:#0d0d0d;padding:32px 40px">
              <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;
                        text-transform:uppercase;color:#a8874a">Gestão de Milhas</p>
              <h1 style="margin:0;font-size:26px;font-weight:400;color:#fff">Guilherme Vieira</h1>
              <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.4)">
                Novo diagnóstico recebido via site
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td colspan="2" style="padding:28px 0 10px">
                    <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.14em;
                              text-transform:uppercase;color:#a8874a;border-bottom:1px solid #e8e0d4;
                              padding-bottom:8px">Dados de Contato</p>
                  </td>
                </tr>
                ${row('Nome', f.nome)}
                ${row('WhatsApp', f.telefone)}
                ${row('E-mail', f.email)}
                <tr>
                  <td colspan="2" style="padding:28px 0 10px">
                    <p style="margin:0;font-size:10px;font-weight:600;letter-spacing:0.14em;
                              text-transform:uppercase;color:#a8874a;border-bottom:1px solid #e8e0d4;
                              padding-bottom:8px">Perfil Financeiro & Viagem</p>
                  </td>
                </tr>
                ${row('Gasto médio mensal', f.gasto)}
                ${row('Viagens por ano', f.viagens)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f5f0e8;padding:20px 40px;text-align:center">
              <p style="margin:0;font-size:11px;color:#aaa">
                GVS Milhas · Balneário Camboriú / SC · 47 99720-2400
              </p>
            </td>
          </tr>
        </table>
      </table>
    </tr>
  </table>
</body>
</html>`;
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['guilherme@gvsmilhas.com.br'],
        reply_to: formData.email,
        subject: `✈ Novo diagnóstico — ${formData.nome || 'Cliente GVS'}`,
        html: buildEmailHTML(formData),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Resend API] erro:', data);
      return { ok: false, error: data };
    }

    console.log('[Resend API] sucesso:', data);
    return { ok: true, id: data.id };
  } catch (err) {
    console.error('[Frontend] falha de rede:', err);
    return { ok: false, error: err.message };
  }
}