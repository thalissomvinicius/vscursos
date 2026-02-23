// ─── Email Template Builders ───────────────────────────────────────
// Extracted from api/admin/users/route.ts for better separation of concerns.
// These functions generate HTML and plain-text email content for
// welcome emails (regular users and admin users).

interface BaseEmailParams {
    name: string
    email: string
    password: string
    loginUrl: string
}

interface WelcomeEmailParams extends BaseEmailParams {
    grantAccess: boolean
}

// ─── Admin Welcome Email ───────────────────────────────────────────

export function buildAdminWelcomeEmailHtml(params: BaseEmailParams): string {
    const { name, email, password, loginUrl } = params

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Acesso Administrativo - VS Cursos</title>
            <style>
                @media only screen and (max-width: 600px) {
                    .container { padding: 10px !important; }
                    .content { padding: 20px 15px !important; }
                    .header { padding: 20px 15px !important; }
                    h1 { font-size: 18px !important; }
                    p { font-size: 14px !important; }
                    .btn { display: block !important; width: 100% !important; max-width: none !important; box-sizing: border-box !important; }
                }
            </style>
        </head>
        <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color:#0f172a;">
            <div class="container" style="max-width:600px;margin:0 auto;padding:40px 20px;">
                <!-- Header -->
                <div class="header" style="background:linear-gradient(135deg, #b45309 0%, #78350f 100%);border-radius:24px 24px 0 0;padding:40px 30px;text-align:center;color:#ffffff;position:relative;overflow:hidden;">
                    <!-- Decorative Circle -->
                    <div style="position:absolute;top:-50px;left:-50px;width:150px;height:150px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
                    
                    <div style="font-size:24px;font-weight:800;letter-spacing:0.05em;margin-bottom:8px;">VS CURSOS</div>
                    <div style="font-size:12px;color:#fef3c7;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;background:rgba(0,0,0,0.2);padding:4px 12px;border-radius:99px;display:inline-block;">Acesso Administrativo</div>
                </div>

                <!-- Main Content -->
                <div class="content" style="background:#ffffff;border-radius:0 0 24px 24px;padding:40px 30px;box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
                    <h1 style="font-size:22px;font-weight:700;margin:0 0 16px;color:#1e293b;text-align:center;">
                        Bem-vindo ao Time, ${name ? name : 'Admin'}!
                    </h1>
                    
                    <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#475569;text-align:center;">
                        Sua conta de administrador foi criada com sucesso. Você agora tem acesso total ao painel de gestão da plataforma.
                    </p>

                    <!-- Credentials Box -->
                    <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:16px;padding:24px;margin:30px 0;">
                        <div style="text-align:center;font-size:12px;color:#92400e;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Suas Credenciais de Admin</div>
                        
                        <div style="margin-bottom:12px;">
                            <div style="font-size:13px;color:#b45309;margin-bottom:4px;">E-mail de acesso</div>
                            <div style="font-size:16px;color:#0f172a;font-weight:600;font-family:monospace;">${email}</div>
                        </div>
                        
                        <div>
                            <div style="font-size:13px;color:#b45309;margin-bottom:4px;">Senha temporária</div>
                            <div style="font-size:16px;color:#0f172a;font-weight:600;font-family:monospace;background:#fef3c7;padding:4px 8px;border-radius:6px;display:inline-block;">${password}</div>
                        </div>
                    </div>

                    <!-- CTA Button -->
                    <div style="text-align:center;margin:30px 0;">
                        <a href="${loginUrl}" class="btn" style="display:inline-block;background:#d97706;color:#ffffff;text-decoration:none;font-weight:600;padding:16px 32px;border-radius:12px;font-size:16px;box-shadow:0 4px 6px -1px rgba(217, 119, 6, 0.2);transition:background 0.2s;">
                            Acessar Painel Admin
                        </a>
                    </div>

                    <!-- Security Notice -->
                    <div style="background:#f8fafc;border-radius:12px;padding:16px;font-size:13px;color:#64748b;line-height:1.5;text-align:center;">
                        <strong>⚠️ Importante:</strong> Por questões de segurança, recomendamos que você altere sua senha imediatamente após o primeiro acesso.
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align:center;margin-top:30px;color:#94a3b8;font-size:12px;">
                    <p style="margin:0;">© ${new Date().getFullYear()} VS Cursos. Uso interno e confidencial.</p>
                </div>
            </div>
        </body>
        </html>
    `
}

export function buildAdminWelcomeEmailText(params: BaseEmailParams): string {
    const { name, email, password, loginUrl } = params

    return [
        `Bem-vindo ao Time, ${name ? name : 'Admin'}!`,
        '',
        'Sua conta de administrador foi criada com sucesso.',
        'Você agora tem acesso total ao painel de gestão da plataforma.',
        '',
        'SUAS CREDENCIAIS:',
        `E-mail: ${email}`,
        `Senha: ${password}`,
        '',
        `Acesse o painel: ${loginUrl}`,
        '',
        'IMPORTANTE: Por questões de segurança, altere sua senha após o primeiro acesso.',
    ].join('\n')
}

// ─── Regular Welcome Email ─────────────────────────────────────────

export function buildWelcomeEmailHtml(params: WelcomeEmailParams): string {
    const { name, email, password, loginUrl, grantAccess } = params
    const accessLine = grantAccess
        ? 'Seu acesso já está liberado.'
        : 'Seu acesso será liberado assim que o pagamento for confirmado.'

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo à VS Cursos</title>
            <style>
                @media only screen and (max-width: 600px) {
                    .container { padding: 10px !important; }
                    .content { padding: 20px 15px !important; }
                    .header { padding: 20px 15px !important; }
                    h1 { font-size: 18px !important; }
                    p { font-size: 14px !important; }
                    .btn { display: block !important; width: 100% !important; max-width: none !important; box-sizing: border-box !important; }
                }
            </style>
        </head>
        <body style="margin:0;padding:0;background-color:#e2e8f0;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color:#0f172a;">
            <div class="container" style="max-width:600px;margin:0 auto;padding:40px 20px;">
                <!-- Header with Characters -->
                <div class="header" style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);border-radius:24px 24px 0 0;padding:40px 30px;text-align:center;color:#ffffff;position:relative;overflow:hidden;">
                    <!-- Decorative Circle -->
                    <div style="position:absolute;top:-50px;left:-50px;width:150px;height:150px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
                    
                    <div style="font-size:24px;font-weight:800;letter-spacing:0.05em;margin-bottom:8px;">VS CURSOS</div>
                    <div style="font-size:14px;color:#94a3b8;font-weight:500;text-transform:uppercase;letter-spacing:0.1em;">eSocial na Prática — SST</div>
                    
                    <!-- Characters / Avatars -->
                    <div style="margin-top:30px;display:flex;justify-content:center;gap:15px;">
                        <div style="background:#3b82f6;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);border:3px solid rgba(255,255,255,0.2);">👩‍💻</div>
                        <div style="background:#2563eb;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);border:3px solid rgba(255,255,255,0.2);">👷</div>
                        <div style="background:#1d4ed8;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);border:3px solid rgba(255,255,255,0.2);">👨‍🏫</div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="content" style="background:#ffffff;border-radius:0 0 24px 24px;padding:40px 30px;box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
                    <h1 style="font-size:22px;font-weight:700;margin:0 0 16px;color:#1e293b;text-align:center;">
                        Bem-vindo(a)${name ? `, ${name}` : ''}!
                    </h1>
                    
                    <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#475569;text-align:center;">
                        Seu cadastro foi realizado com sucesso. ${accessLine}
                    </p>

                    <!-- Credentials Box -->
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px;margin:30px 0;">
                        <div style="text-align:center;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Suas Credenciais</div>
                        
                        <div style="margin-bottom:12px;">
                            <div style="font-size:13px;color:#94a3b8;margin-bottom:4px;">E-mail de acesso</div>
                            <div style="font-size:16px;color:#0f172a;font-weight:600;font-family:monospace;">${email}</div>
                        </div>
                        
                        <div>
                            <div style="font-size:13px;color:#94a3b8;margin-bottom:4px;">Senha temporária</div>
                            <div style="font-size:16px;color:#0f172a;font-weight:600;font-family:monospace;background:#e2e8f0;padding:4px 8px;border-radius:6px;display:inline-block;">${password}</div>
                        </div>
                    </div>

                    <!-- CTA Button -->
                    <div style="text-align:center;margin:30px 0;">
                        <a href="${loginUrl}" class="btn" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:600;padding:16px 32px;border-radius:12px;font-size:16px;box-shadow:0 4px 6px -1px rgba(37, 99, 235, 0.2);transition:background 0.2s;">
                            Acessar Plataforma
                        </a>
                    </div>

                    <!-- Features List -->
                    <div style="border-top:1px solid #f1f5f9;margin-top:30px;padding-top:30px;">
                        <div style="font-size:14px;font-weight:600;color:#334155;margin-bottom:16px;text-align:center;">O que você vai encontrar:</div>
                        <ul style="padding:0;margin:0;list-style:none;">
                            <li style="margin-bottom:12px;display:flex;align-items:center;color:#64748b;font-size:14px;">
                                <span style="color:#10b981;margin-right:10px;font-size:16px;">✓</span> Certificado válido em todo território nacional
                            </li>
                            <li style="margin-bottom:12px;display:flex;align-items:center;color:#64748b;font-size:14px;">
                                <span style="color:#10b981;margin-right:10px;font-size:16px;">✓</span> Conteúdo atualizado com as normas vigentes
                            </li>
                            <li style="margin-bottom:12px;display:flex;align-items:center;color:#64748b;font-size:14px;">
                                <span style="color:#10b981;margin-right:10px;font-size:16px;">✓</span> Suporte direto com especialistas
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align:center;margin-top:30px;color:#94a3b8;font-size:12px;">
                    <p style="margin:0 0 8px;">Dúvidas? Responda a este e-mail.</p>
                    <p style="margin:0;">© ${new Date().getFullYear()} VS Capacitação Profissional. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `
}

export function buildWelcomeEmailText(params: WelcomeEmailParams): string {
    const { name, email, password, loginUrl, grantAccess } = params
    const accessLine = grantAccess
        ? 'Seu acesso já está liberado.'
        : 'Seu acesso será liberado assim que o pagamento for confirmado.'

    return [
        `Olá${name ? `, ${name}` : ''}!`,
        '',
        'Seu cadastro foi criado com sucesso.',
        accessLine,
        '',
        'Dados de acesso:',
        `E-mail: ${email}`,
        `Senha: ${password}`,
        '',
        `Acesse o painel: ${loginUrl}`,
        '',
        'Gratificações do curso:',
        '- Certificado digital de 40 horas com código de validação',
        '- Acesso vitalício ao conteúdo e atualizações futuras',
        '- Quizzes de fixação por módulo',
        '- Apostila em PDF para estudo offline',
        '- Suporte direto pelo WhatsApp',
        '',
        'Recomendamos que você altere sua senha após o primeiro acesso.',
    ].join('\n')
}
