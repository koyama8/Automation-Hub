const API_URL = 'http://localhost:3030'
const API_HEALTH_TIMEOUT = 3000
const EVIDENCE_MAX_FILE_SIZE = 1024 * 1024
const EVIDENCE_ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'text/plain',
  'text/csv',
  'application/json',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]
const EVIDENCE_EXTENSION_MIME_MAP = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  pdf: 'application/pdf',
  txt: 'text/plain',
  csv: 'text/csv',
  json: 'application/json',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
const ADMIN_EMAILS = ['qa@adminlab.com']
const LEGACY_ADMIN_EMAILS = ['alab@hotmail.com', 'qa@cypressqalab.com']
const ADMIN_PASSWORD = 'pwd123'
const STORE_USERS = 'qa_automation_lab_users'
const STORE_FORMS = 'qa_automation_lab_forms'
const STORE_CHARACTERS = 'qa_automation_lab_characters'
const STORE_CHARACTERS_SEEDED = 'qa_automation_lab_characters_seeded_v3'
const EMAIL_ERROR = 'Informe um e-mail valido de provedor conhecido'
const EMAIL_NOT_FOUND_ERROR = 'E-mail não cadastrado na base de dados'
const ALLOWED_EMAIL_DOMAINS = [
  'adminlab.com',
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.com.br',
  'outlook.com',
  'outlook.com.br',
  'live.com',
  'live.com.br',
  'msn.com',
  'yahoo.com',
  'yahoo.com.br',
  'ymail.com',
  'rocketmail.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
  'zohomail.com',
  'gmx.com',
  'gmx.net',
  'mail.com',
  'uol.com.br',
  'bol.com.br',
  'terra.com.br',
  'ig.com.br',
  'globo.com',
]
const VIEW_ROUTES = {
  loginView: '/admin/login',
  dashboardView: '/admin/dashboard',
  registerView: '/admin/cadastro',
  usersView: '/admin/usuarios',
  clientsView: '/admin/clientes',
  contractsView: '/admin/contratos',
  productsView: '/admin/produtos',
  cartView: '/admin/carrinho',
  ordersView: '/admin/pedidos',
  paymentsView: '/admin/pagamentos',
  reportsView: '/admin/relatorios',
  couponsView: '/admin/cupons',
  evidencesView: '/admin/evidencias-api',
  forgotView: '/admin/recuperar-senha',
  testDataView: '/admin/massa-de-testes',
  checkoutView: '/admin/checkout',
  formView: '/admin/formulario',
  visualView: '/admin/estados-visuais',
  uploadView: '/admin/upload',
  tableView: '/admin/tabela-dinamica',
  settingsView: '/admin/preferencias',
  modalView: '/admin/termos',
  apiView: '/admin/status-api',
  keyboardView: '/admin/teclado',
  characterView: '/admin/personagens',
  characterManagementView: '/journeys/character-management',
  scenarioBuilderView: '/journeys/scenario-builder',
  hobbyView: '/journeys/hobby-registration',
}
const ROUTE_VIEWS = Object.fromEntries(Object.entries(VIEW_ROUTES).map(([viewId, path]) => [path, viewId]))

const views = document.querySelectorAll('[data-view]')
const toast = document.querySelector('#toast')
const currentDate = new Intl.DateTimeFormat('pt-BR').format(new Date())
const tags = []
const FEATURE_PAGE_SIZE = 10
const CHARACTER_PAGE_SIZE = 10
const DEFAULT_CHARACTERS = [
  { id: 'default-batman', name: 'Batman', story: 'Detetive de Gotham, estrategista e membro central da Liga da Justica.', universe: 'Liga da Justica', year: '1939', image: '', featured: true },
  { id: 'default-superman', name: 'Superman', story: 'Heroi kryptoniano com superforca, voo e senso absoluto de justica.', universe: 'Liga da Justica', year: '1938', image: '', featured: true },
  { id: 'default-wonder-woman', name: 'Mulher-Maravilha', story: 'Guerreira amazona com laco da verdade, coragem e lideranca.', universe: 'Liga da Justica', year: '1941', image: '', featured: true },
  { id: 'default-flash', name: 'Flash', story: 'Velocista capaz de manipular tempo e espaco pela Forca de Aceleracao.', universe: 'Liga da Justica', year: '1940', image: '', featured: false },
  { id: 'default-goku', name: 'Goku', story: 'Saiyajin que busca superar seus limites em cada batalha.', universe: 'Dragon Ball', year: '1984', image: '', featured: true },
  { id: 'default-vegeta', name: 'Vegeta', story: 'Principe dos Saiyajins, rival de Goku e guerreiro extremamente orgulhoso.', universe: 'Dragon Ball', year: '1988', image: '', featured: false },
  { id: 'default-gohan', name: 'Gohan', story: 'Filho de Goku, com grande potencial de combate e perfil estudioso.', universe: 'Dragon Ball', year: '1988', image: '', featured: false },
  { id: 'default-naruto', name: 'Naruto Uzumaki', story: 'Ninja determinado a se tornar Hokage e proteger seus amigos.', universe: 'Naruto', year: '1999', image: '', featured: true },
  { id: 'default-sasuke', name: 'Sasuke Uchiha', story: 'Ultimo herdeiro de um cla poderoso em busca de resposta e redencao.', universe: 'Naruto', year: '1999', image: '', featured: false },
  { id: 'default-sakura', name: 'Sakura Haruno', story: 'Ninja medica com controle de chakra e grande forca fisica.', universe: 'Naruto', year: '1999', image: '', featured: false },
  { id: 'default-luffy', name: 'Monkey D. Luffy', story: 'Capitao pirata que sonha encontrar o One Piece e virar Rei dos Piratas.', universe: 'One Piece', year: '1997', image: '', featured: true },
  { id: 'default-zoro', name: 'Roronoa Zoro', story: 'Espadachim dos Chapeus de Palha que busca ser o maior do mundo.', universe: 'One Piece', year: '1997', image: '', featured: false },
  { id: 'default-tanjiro', name: 'Tanjiro Kamado', story: 'Cacador de demonios guiado por empatia, disciplina e familia.', universe: 'Demon Slayer', year: '2016', image: '', featured: true },
  { id: 'default-nezuko', name: 'Nezuko Kamado', story: 'Irma de Tanjiro transformada em demonio, mas ainda protetora.', universe: 'Demon Slayer', year: '2016', image: '', featured: false },
  { id: 'default-deku', name: 'Izuku Midoriya', story: 'Aluno heroico que aprende a controlar o One For All.', universe: 'My Hero Academia', year: '2014', image: '', featured: true },
  { id: 'default-bakugo', name: 'Katsuki Bakugo', story: 'Heroi em treinamento com poder explosivo e personalidade intensa.', universe: 'My Hero Academia', year: '2014', image: '', featured: false },
  { id: 'default-spider-man', name: 'Homem-Aranha', story: 'Heroi urbano que equilibra responsabilidade, perdas e vida comum.', universe: 'Marvel', year: '1962', image: '', featured: true },
  { id: 'default-iron-man', name: 'Homem de Ferro', story: 'Inventor bilionario que usa tecnologia avancada para atuar como heroi.', universe: 'Marvel', year: '1963', image: '', featured: false },
  { id: 'default-sailor-moon', name: 'Sailor Moon', story: 'Guardia magica que protege o mundo com coragem, amizade e luz.', universe: 'Sailor Moon', year: '1991', image: '', featured: true },
  { id: 'default-ichigo', name: 'Ichigo Kurosaki', story: 'Substituto de shinigami que protege humanos e espiritos.', universe: 'Bleach', year: '2001', image: '', featured: false },
]

let currentViewId = 'loginView'
let previousViewId = 'dashboardView'
let currentFeaturePage = 1
let characterManagementPage = 1
let characterSearchTimer = null
let pendingDeleteCharacterId = null
let pendingEditCharacterId = null
let clientsCache = []
let editingClientId = null
let pendingDeleteClientId = null
let clientSearchTimer = null
let contractsCache = []
let contractClientsCache = []
let editingContractId = null
let pendingDeleteContractId = null
let contractSearchTimer = null
let productsCache = []
let editingProductId = null
let productSearchTimer = null
let commerceClientsCache = []
let cartData = null
let orderDraftItems = []
let ordersCache = []
let orderSearchTimer = null
let paymentsCache = []
let reportCurrentPage = 1
let reportTotalPages = 1
let couponsCache = []
let editingCouponId = null
let couponSearchTimer = null
let evidencesCache = []
let evidenceSearchTimer = null
let currentSessionMode = 'local'
let apiAvailability = 'unknown'
let sessionRedirectInProgress = false
let tableRows = [
  { id: 1, name: 'Login com sucesso', status: 'Automatizado' },
  { id: 2, name: 'Formulário obrigatório', status: 'Planejado' },
  { id: 3, name: 'Validação de modal', status: 'Revisão' },
]

const CHECKOUT_PRODUCTS = [
  {
    id: 'curso-cypress',
    name: 'Curso Cypress E2E',
    category: 'curso',
    categoryLabel: 'Curso',
    badge: 'CY',
    level: 'Intermediario',
    price: 129.9,
    detail: 'Fluxos web com login, modal, dashboard e checkout local.',
    features: ['8 aulas praticas', 'Suite Cypress pronta', 'Massa local'],
  },
  {
    id: 'curso-playwright',
    name: 'Curso Playwright Web',
    category: 'curso',
    categoryLabel: 'Curso',
    badge: 'PW',
    level: 'Avancado',
    price: 149.9,
    detail: 'Automacao moderna com multiplos navegadores e cenarios E2E.',
    features: ['Page objects', 'Trace viewer', 'Execucao paralela'],
  },
  {
    id: 'template-regressao',
    name: 'Template de regressao',
    category: 'template',
    categoryLabel: 'Template',
    badge: 'RG',
    level: 'Checklist',
    price: 49.9,
    detail: 'Checklist organizado para smoke, regressao e riscos do fluxo.',
    features: ['Prioridade por rota', 'Mapa de risco', 'Evidencias'],
  },
  {
    id: 'template-api',
    name: 'Template API Testing',
    category: 'template',
    categoryLabel: 'Template',
    badge: 'API',
    level: 'Contrato',
    price: 39.9,
    detail: 'Matriz de verbos, status, payloads e validacao de contrato.',
    features: ['GET/POST/PUT/DELETE', 'Status esperado', 'Payload exemplo'],
  },
  {
    id: 'evidencia-video',
    name: 'Pacote de evidencias',
    category: 'evidencia',
    categoryLabel: 'Evidencia',
    badge: 'EV',
    level: 'Relatorio',
    price: 29.9,
    detail: 'Padrao visual para prints, videos e relatorios de execucao.',
    features: ['Template de bug', 'Video local', 'Resumo executivo'],
  },
]
const CHECKOUT_COUPONS = {
  QA10: 0.1,
  E2E15: 0.15,
}

let keyboardRows = []
let keyboardNextId = 1
let scenarioRows = []
let scenarioSteps = []
let scenarioNextId = 1
let checkoutCart = []
let checkoutCoupon = ''
let pendingCheckoutPayment = ''
let pendingCheckoutSnapshot = null
let checkoutPixExpiresAt = 0
let checkoutPixTimer = null
const recoveryTokenHistory = new Set()

function getElement(selector) {
  const element = document.querySelector(selector)
  if (element || !selector.startsWith('#')) return element

  const key = selector.slice(1)
  const formName = key.endsWith('Form') ? key.slice(0, -4) : key

  return document.querySelector(
    `[data-field="${key}"], [data-role="${key}"], [data-form="${formName}"], [data-cy="${toKebabCase(key)}"]`,
  )
}

function toKebabCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatPhone(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function formatDocument(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 14)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  if (digits.length <= 11) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

function setupPhoneMasks() {
  const phoneInput = getElement('#contactPhone')
  if (!phoneInput || phoneInput.dataset.maskReady === 'true') return

  phoneInput.dataset.maskReady = 'true'
  phoneInput.addEventListener('input', (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value)
  })
}

function setupDocumentMasks() {
  const documentInput = getElement('#contactDocument')
  if (!documentInput || documentInput.dataset.maskReady === 'true') return

  documentInput.dataset.maskReady = 'true'
  documentInput.addEventListener('input', (event) => {
    event.currentTarget.value = formatDocument(event.currentTarget.value)
  })
}

function setupClientMasks() {
  const phoneInput = getElement('[data-field="clientPhone"]')
  const documentInput = getElement('[data-field="clientDocument"]')

  phoneInput?.addEventListener('input', (event) => {
    event.currentTarget.value = formatPhone(event.currentTarget.value)
  })

  documentInput?.addEventListener('input', (event) => {
    event.currentTarget.value = formatDocument(event.currentTarget.value)
  })
}

function showToast(message, type = 'success') {
  toast.textContent = message
  toast.classList.toggle('error-toast', type === 'error')
  toast.classList.remove('hidden')
  setTimeout(() => toast.classList.add('hidden'), 4200)
}

function appendAssistantMessage(message, type = 'bot', options = {}) {
  const body = getElement('[data-cy="assistant-messages"]')
  if (!body) return

  const paragraph = document.createElement('p')
  paragraph.className = `assistant-message ${type === 'user' ? 'user-message' : 'bot-message'}`
  if (options.html) {
    paragraph.innerHTML = message
  } else {
    paragraph.textContent = message
  }
  body.appendChild(paragraph)
  body.scrollTop = body.scrollHeight
}

function setAssistantOpen(isOpen) {
  getElement('[data-cy="assistant-window"]')?.classList.toggle('hidden', !isOpen)
  getElement('[data-cy="assistant-open"]')?.classList.toggle('hidden', isOpen)
}

function setupLoginAssistant() {
  const launcher = getElement('[data-cy="assistant-open"]')
  const closeButton = getElement('[data-cy="assistant-close"]')
  const options = document.querySelector('.assistant-options')
  const form = getElement('[data-cy="assistant-form"]')
  const input = getElement('[data-cy="assistant-input"]')

  if (!launcher || launcher.dataset.ready === 'true') return

  launcher.dataset.ready = 'true'
  launcher.addEventListener('click', () => setAssistantOpen(true))
  closeButton?.addEventListener('click', () => setAssistantOpen(false))
  setAssistantOpen(false)

  options?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-assistant-action]')
    if (!button) return

    const action = button.dataset.assistantAction
    appendAssistantMessage(button.textContent.trim(), 'user')

    if (action === 'credentials') {
      appendAssistantMessage(
        'Acesso local pronto para automação:<br><strong>Login:</strong> qa@adminlab.com<br><strong>Senha:</strong> pwd123<br><span>Você pode validar esse fluxo mesmo com a API desligada.</span>',
        'bot',
        { html: true },
      )
    }

    if (action === 'register') {
      appendAssistantMessage('Vou abrir a tela de cadastro. Depois valide o modal de sucesso ou o alerta de e-mail duplicado.')
      showView('registerView')
    }

    if (action === 'terms') {
      appendAssistantMessage(
        '<strong>Termos do laboratório:</strong><br>Este ambiente foi criado para estudos de automação web e API com dados fictícios. Use as telas para treinar login, cadastro, validações, modais, tabelas e evidências sem depender de uma API real.',
        'bot',
        { html: true },
      )
    }

    if (action === 'dismiss') {
      appendAssistantMessage('Tudo bem. Quando precisar, clique no robô no canto da tela para reabrir.')
      setTimeout(() => setAssistantOpen(false), 700)
    }
  })

  form?.addEventListener('submit', (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (!text) return

    appendAssistantMessage(text, 'user')
    input.value = ''
    appendAssistantMessage('Anotado. Para treinar Cypress, valide este chat pelo botão, pela mensagem e pelo texto digitado.')
  })
}

function setupPasswordToggles() {
  document.querySelectorAll('[data-password-toggle]').forEach((button) => {
    if (button.dataset.ready === 'true') return

    const input = getElement(button.dataset.passwordToggle)
    if (!input) return

    const showIcon = button.querySelector('[data-icon="show"]')
    const hideIcon = button.querySelector('[data-icon="hide"]')

    const setVisible = (isVisible) => {
      input.type = isVisible ? 'text' : 'password'
      button.setAttribute('aria-label', isVisible ? 'Ocultar senha' : 'Mostrar senha')
      button.setAttribute('aria-pressed', String(isVisible))
      showIcon?.classList.toggle('hidden', isVisible)
      hideIcon?.classList.toggle('hidden', !isVisible)
    }

    button.dataset.ready = 'true'
    button.addEventListener('click', () => {
      setVisible(input.type === 'password')
      input.focus({ preventScroll: true })
    })

    setVisible(false)
  })
}

function openModal(message, options = {}) {
  const title = getElement('[data-cy="modal-title"]')
  const secondaryButton = getElement('[data-cy="modal-secondary"]')
  const closeButton = getElement('[data-cy="modal-close"]')
  const modalCard = getElement('[data-cy="success-modal"]')
  const modalBadge = getElement('[data-cy="modal-badge"]')
  const modalList = getElement('[data-cy="modal-list"]')
  const isAlert = options.variant === 'error'
  const isRegisterFeedback = options.context === 'register'
  const isRecoveryFeedback = options.context === 'recovery'
  const isHobbyFeedback = options.context === 'hobby'

  title.textContent = options.title || (isAlert ? 'Alerta' : 'Sucesso!')
  getElement('[data-cy="success-message"]').textContent = message
  modalCard.classList.toggle('alert-modal', isAlert)
  modalCard.classList.toggle('register-feedback-modal', isRegisterFeedback)
  modalCard.classList.toggle('register-success-modal', isRegisterFeedback && !isAlert)
  modalCard.classList.toggle('register-alert-modal', isRegisterFeedback && isAlert)
  modalCard.classList.toggle('token-feedback-modal', isRecoveryFeedback)
  modalCard.classList.toggle('hobby-feedback-modal', isHobbyFeedback)
  modalBadge.textContent = options.icon || (isAlert ? '!' : 'LAB')
  modalList.innerHTML = ''
  if (Array.isArray(options.items) && options.items.length) {
    modalList.innerHTML = options.items
      .map((item) => {
        if (typeof item === 'string') return `<li>${escapeHtml(item)}</li>`
        return `<li><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></li>`
      })
      .join('')
    modalList.classList.remove('hidden')
  } else {
    modalList.classList.add('hidden')
  }
  secondaryButton.textContent = options.actionLabel || ''
  secondaryButton.dataset.actionView = options.actionView || ''
  secondaryButton.classList.toggle('hidden', !options.actionLabel)
  closeButton.textContent = options.closeLabel || 'Fechar'
  closeButton.dataset.copyValue = options.copyValue || ''
  getElement('#successModal').classList.remove('hidden')
}

function closeModal() {
  getElement('#successModal').classList.add('hidden')
  getElement('[data-cy="success-modal"]').classList.remove('alert-modal', 'register-feedback-modal', 'register-success-modal', 'register-alert-modal', 'token-feedback-modal', 'hobby-feedback-modal')
  getElement('[data-cy="modal-badge"]').textContent = 'LAB'
  getElement('[data-cy="modal-list"]').innerHTML = ''
  getElement('[data-cy="modal-list"]').classList.add('hidden')
  getElement('[data-cy="modal-secondary"]').classList.add('hidden')
  getElement('[data-cy="modal-secondary"]').dataset.actionView = ''
  getElement('[data-cy="modal-close"]').textContent = 'Fechar'
  getElement('[data-cy="modal-close"]').dataset.copyValue = ''
}

function openRegisterFeedback(type, userOrMessage) {
  const isSuccess = type === 'success'
  const userName = typeof userOrMessage === 'object' ? userOrMessage.name?.trim() : ''
  const email = typeof userOrMessage === 'object' ? userOrMessage.email?.trim().toLowerCase() : ''
  const message = isSuccess
    ? `O usuário '${userName || email}' foi cadastrado e já está disponível para login.`
    : String(userOrMessage || 'Este e-mail já está cadastrado. Informe outro e-mail para continuar.')

  openModal(message, {
    title: isSuccess ? 'Cadastro realizado com sucesso' : 'Cadastro não concluído',
    variant: isSuccess ? 'success' : 'error',
    context: 'register',
    icon: isSuccess ? '✓' : '?',
    closeLabel: 'Ok',
  })
}

function generateRecoveryToken() {
  let token = ''

  do {
    const timestamp = Date.now().toString(36).slice(-4).toUpperCase()
    let randomPart = Math.random().toString(36).slice(2, 6).toUpperCase()

    if (window.crypto?.getRandomValues) {
      const buffer = new Uint32Array(1)
      window.crypto.getRandomValues(buffer)
      randomPart = buffer[0].toString(36).slice(0, 4).toUpperCase().padEnd(4, '0')
    }

    token = `QA-${randomPart}-${timestamp}`
  } while (recoveryTokenHistory.has(token))

  recoveryTokenHistory.add(token)
  if (recoveryTokenHistory.size > 30) {
    recoveryTokenHistory.delete(recoveryTokenHistory.values().next().value)
  }

  return token
}

function openRecoveryTokenModal(email, token = generateRecoveryToken()) {
  openModal('Token gerado com sucesso. Use este código para concluir a redefinição de senha.', {
    title: 'Recuperação pronta',
    context: 'recovery',
    icon: 'QA',
    closeLabel: 'Copiar token',
    copyValue: token,
    items: [
      { label: 'E-mail validado', value: email },
      { label: 'Token de recuperação', value: token },
      { label: 'Validade', value: '15 minutos' },
    ],
  })
}

function renderFeaturePagination() {
  const cards = Array.from(document.querySelectorAll('.quick-grid .feature-card'))
  const pagination = getElement('[data-cy="feature-pagination"]')
  if (!cards.length || !pagination) return

  const totalPages = Math.ceil(cards.length / FEATURE_PAGE_SIZE)
  currentFeaturePage = Math.min(Math.max(currentFeaturePage, 1), totalPages)
  const start = (currentFeaturePage - 1) * FEATURE_PAGE_SIZE
  const end = start + FEATURE_PAGE_SIZE

  cards.forEach((card, index) => {
    card.classList.toggle('hidden', index < start || index >= end)
  })

  if (totalPages <= 1) {
    pagination.classList.add('hidden')
    pagination.innerHTML = ''
    return
  }

  pagination.classList.remove('hidden')
  pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1
    const isActive = page === currentFeaturePage
    return `<button class="page-btn${isActive ? ' active' : ''}" data-feature-page="${page}" type="button" aria-current="${isActive ? 'page' : 'false'}">${page}</button>`
  }).join('')
}

function openDialog(selector) {
  getElement(selector).classList.remove('hidden')
}

function closeDialog(selector) {
  getElement(selector).classList.add('hidden')
}

function resetTermsSignature() {
  getElement('[data-cy="terms-accept-check"]').checked = false
  getElement('[data-cy="terms-error"]').textContent = ''
}

function getRouteView() {
  return ROUTE_VIEWS[window.location.pathname] || 'loginView'
}

function updateRoute(viewId, mode = 'push') {
  const path = VIEW_ROUTES[viewId]
  if (!path || window.location.pathname === path) return

  const method = mode === 'replace' ? 'replaceState' : 'pushState'
  history[method]({ viewId }, '', path)
}

function showView(viewId, options = {}) {
  const nextView = getElement(`#${viewId}`)
  if (!nextView) return
  const footer = document.querySelector('.site-footer')
  const appShell = document.querySelector('.app-shell')

  if (currentViewId !== viewId && !options.fromHistory) {
    previousViewId = currentViewId
  }

  views.forEach((view) => view.classList.add('hidden'))
  nextView.classList.remove('hidden')
  currentViewId = viewId
  footer?.classList.toggle('hidden', viewId !== 'dashboardView')
  appShell?.classList.toggle('footer-hidden', viewId !== 'dashboardView')
  if (!options.skipRoute) {
    updateRoute(viewId, options.replaceRoute ? 'replace' : 'push')
  }
  window.scrollTo({ top: 0, behavior: 'auto' })

  if (viewId === 'dashboardView') {
    getElement('[data-cy="access-date"]').textContent = currentDate
    updateDashboardMetrics()
    refreshApiAvailability()
    renderFeaturePagination()
  }

  if (viewId === 'usersView') {
    loadUsers()
  }

  if (viewId === 'clientsView') {
    loadClients()
  }

  if (viewId === 'contractsView') {
    loadContracts()
  }

  if (viewId === 'productsView') {
    loadProducts()
  }

  if (viewId === 'cartView') {
    setupCartView()
  }

  if (viewId === 'ordersView') {
    setupOrdersView()
  }

  if (viewId === 'paymentsView') {
    setupPaymentsView()
  }

  if (viewId === 'reportsView') {
    setupReportsView()
  }

  if (viewId === 'couponsView') {
    setupCouponsView()
  }

  if (viewId === 'evidencesView') {
    setupEvidencesView()
  }

  if (viewId === 'tableView') {
    renderDynamicTable()
  }

  if (viewId === 'keyboardView') {
    renderKeyboardScenarios()
  }

  if (viewId === 'checkoutView') {
    renderCheckout()
  }

  if (viewId === 'characterManagementView') {
    setupCharacterManagement()
  }

  if (viewId === 'scenarioBuilderView') {
    setupScenarioBuilder()
  }

  if (viewId === 'hobbyView') {
    updateHobbyPreview()
  }
}

function goBackView() {
  showView(previousViewId || 'dashboardView')
}

function getCurrentPort() {
  if (window.location.port) return window.location.port
  return window.location.protocol === 'https:' ? '443' : '80'
}

function getApiPort() {
  try {
    return new URL(API_URL).port || '80'
  } catch (error) {
    return '3030'
  }
}

function updateDashboardMetrics() {
  const screenCount = Array.from(views).filter((view) => !['loginView', 'dashboardView'].includes(view.id)).length
  const flowCount = document.querySelectorAll('#dashboardView .quick-grid .feature-card').length

  getElement('[data-cy="metric-screens"]').textContent = String(screenCount)
  getElement('[data-cy="metric-flows"]').textContent = String(flowCount)
  getElement('[data-cy="metric-interface-port"]').textContent = getCurrentPort()
  getElement('[data-cy="metric-api-port"]').textContent = apiAvailability === 'online' ? getApiPort() : apiAvailability === 'checking' ? 'Verificando...' : 'Indisponível'
}

function getApiHealthUrl(baseUrl = API_URL) {
  const normalizedUrl = baseUrl.trim().replace(/\/$/, '')
  return normalizedUrl.endsWith('/api/health') ? normalizedUrl : `${normalizedUrl}/api/health`
}

async function checkApiHealth(baseUrl = API_URL) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_HEALTH_TIMEOUT)

  try {
    const response = await fetch(getApiHealthUrl(baseUrl), {
      cache: 'no-store',
      signal: controller.signal,
    })
    const body = await response.json().catch(() => ({}))
    const operational = response.ok && body.status === 'ok' && body.database === 'connected'

    return {
      operational,
      reached: true,
      status: response.status,
      body,
    }
  } catch (error) {
    return {
      operational: false,
      reached: false,
      status: 0,
      body: {},
    }
  } finally {
    clearTimeout(timeout)
  }
}

function applyApiAvailability(health) {
  apiAvailability = health.operational ? 'online' : 'offline'
  updateDashboardMetrics()

  const mode = getElement('[data-cy="session-mode"]')
  if (mode) {
    mode.textContent = health.operational
      ? currentSessionMode === 'api'
        ? 'API conectada'
        : 'Login local'
      : 'API indisponível'
  }
}

async function refreshApiAvailability() {
  apiAvailability = 'checking'
  updateDashboardMetrics()
  const health = await checkApiHealth()
  applyApiAvailability(health)
  return health
}

function setError(fieldId, message = '') {
  const error = getElement(`[data-error-for="${fieldId}"]`)
  if (error) error.textContent = message
}

function clearFormErrors(form) {
  form.querySelectorAll('[data-error-for]').forEach((error) => {
    error.textContent = ''
  })
}

function requireField(id, message) {
  const field = getElement(`#${id}`)
  if (!field.value.trim()) {
    setError(id, message)
    return false
  }
  return true
}

function requireChecked(id, message) {
  const field = getElement(`#${id}`)
  if (!field.checked) {
    setError(id, message)
    return false
  }
  return true
}

function getTodayInputValue() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function setupScenarioBuilder() {
  const dateField = getElement('#scenarioDate')
  if (dateField && !dateField.value) dateField.value = getTodayInputValue()
  updateScenarioRiskValue()
  renderScenarioSteps()
  renderScenarioRows()
}

function updateScenarioRiskValue() {
  const riskField = getElement('#scenarioRisk')
  const riskValue = getElement('#scenarioRiskValue')
  if (riskField && riskValue) riskValue.textContent = riskField.value
}

function addScenarioStep() {
  const input = getElement('#scenarioStepInput')
  const value = input.value.trim()
  if (!value) {
    setError('scenarioStepInput', 'Informe uma etapa para adicionar')
    return
  }

  scenarioSteps.push(value)
  input.value = ''
  setError('scenarioStepInput')
  renderScenarioSteps()
}

function renderScenarioSteps() {
  const list = getElement('#scenarioSteps')
  if (!list) return

  list.innerHTML = scenarioSteps
    .map(
      (step, index) => `
        <li>
          <span>${escapeHtml(step)}</span>
          <button class="compact-btn secondary-btn" data-remove-step="${index}" type="button">Remover</button>
        </li>
      `,
    )
    .join('')
}

function getScenarioCoverage() {
  return Array.from(document.querySelectorAll('input[name="scenario-coverage"]:checked')).map((input) => input.value)
}

function getScenarioPayload() {
  return {
    id: scenarioNextId,
    name: getElement('#scenarioName').value.trim(),
    module: getElement('#scenarioModule').value,
    priority: getElement('#scenarioPriority').value,
    date: getElement('#scenarioDate').value || 'Sem data',
    risk: getElement('#scenarioRisk').value,
    kind: getElement('input[name="scenario-kind"]:checked').value,
    coverage: getScenarioCoverage(),
    preconditions: getElement('#scenarioPreconditions').value.trim() || 'Sem pré-condições',
    steps: [...scenarioSteps],
    ready: getElement('#scenarioRegressionReady').checked,
  }
}

function validateScenarioBuilder(form) {
  clearFormErrors(form)

  const nameValid = requireField('scenarioName', 'Informe o nome do cenário')
  const moduleValid = requireField('scenarioModule', 'Selecione o módulo')
  const coverage = getScenarioCoverage()
  const stepsValid = scenarioSteps.length > 0

  if (!coverage.length) setError('scenarioCoverage', 'Selecione pelo menos uma cobertura')
  if (!stepsValid) setError('scenarioStepInput', 'Adicione pelo menos uma etapa do fluxo')

  return nameValid && moduleValid && coverage.length > 0 && stepsValid
}

function openScenarioPreview(payload) {
  openModal('Revise o resumo antes de salvar ou use este modal como alvo de validação.', {
    title: 'Preview do cenário',
    icon: 'QA',
    closeLabel: 'Fechar preview',
    items: [
      { label: 'Cenário', value: payload.name },
      { label: 'Módulo', value: payload.module },
      { label: 'Tipo', value: payload.kind },
      { label: 'Prioridade', value: payload.priority },
      { label: 'Risco', value: payload.risk },
      { label: 'Cobertura', value: payload.coverage.join(', ') },
      { label: 'Etapas', value: String(payload.steps.length) },
      { label: 'Regressão', value: payload.ready ? 'Pronto' : 'Ainda não' },
    ],
  })
}

function resetScenarioBuilderForm(form) {
  form.reset()
  scenarioSteps = []
  getElement('#scenarioDate').value = getTodayInputValue()
  updateScenarioRiskValue()
  renderScenarioSteps()
}

function renderScenarioRows() {
  const tbody = getElement('#scenarioRows')
  const empty = getElement('#scenarioEmpty')
  const count = getElement('#scenarioCount')
  if (!tbody || !empty || !count) return

  const search = getElement('#scenarioSearch')?.value.trim().toLowerCase() || ''
  const rows = scenarioRows.filter((row) => {
    const haystack = `${row.name} ${row.module} ${row.kind} ${row.priority}`.toLowerCase()
    return haystack.includes(search)
  })

  count.textContent = `${rows.length} de ${scenarioRows.length} cenários salvos`
  empty.hidden = rows.length > 0
  tbody.innerHTML = rows
    .map(
      (row) => `
        <tr data-scenario-id="${row.id}">
          <td>${row.id}</td>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(row.module)}</td>
          <td>${escapeHtml(row.kind)}</td>
          <td><span class="status-badge ${Number(row.risk) >= 4 ? 'featured' : 'standard'}">Risco ${escapeHtml(row.risk)}</span></td>
          <td>
            <div class="row-actions">
              <button class="compact-btn secondary-btn" data-scenario-action="view" type="button">Ver</button>
              <button class="compact-btn danger-action" data-scenario-action="delete" type="button">Excluir</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('')
}

function getHobbyForm() {
  return getElement('#hobbyStudioForm')
}

function getHobbyField(selector) {
  return getHobbyForm()?.querySelector(selector)
}

function getHobbyValue(selector) {
  return getHobbyField(selector)?.value.trim() || ''
}

function updateHobbyPreview() {
  const form = getHobbyForm()
  if (!form) return

  const setPreview = (key, value) => {
    const target = form.querySelector(`[data-preview="${key}"]`)
    if (target) target.textContent = value
  }

  const name = getHobbyValue('#hobbyTitle') || 'Aguardando preenchimento'
  const type = getHobbyValue('#hobbyType') || 'Não selecionado'
  const frequency = getHobbyValue('[name="practice-frequency"]') || 'Não selecionada'
  const season = getHobbyValue('[name="practice-season"]') || 'Qualquer período'
  const hours = getHobbyValue('[name="weekly-hours"]') || '0'
  const highlight = getHobbyField('.hobby-highlight-toggle input')?.checked ? 'Sim' : 'Não'

  setPreview('name', name)
  setPreview('type', type)
  setPreview('frequency', frequency)
  setPreview('season', season)
  setPreview('hours', `${hours}h por semana`)
  setPreview('highlight', highlight)
}

function validateHobbyForm() {
  const form = getHobbyForm()
  clearFormErrors(form)

  const title = getHobbyValue('#hobbyTitle')
  const description = getHobbyValue('[name="hobby-description"]')
  const type = getHobbyValue('#hobbyType')
  const frequency = getHobbyValue('[name="practice-frequency"]')

  if (!title) setError('hobbyTitle', 'Informe o nome do hobby')
  if (!description) setError('hobbyDescription', 'Descreva como o hobby funciona')
  if (!type) setError('hobbyType', 'Selecione o tipo de hobby')
  if (!frequency) setError('hobbyFrequency', 'Selecione a frequência')

  return Boolean(title && description && type && frequency)
}

function getHobbyPayload() {
  return {
    title: getHobbyValue('#hobbyTitle'),
    description: getHobbyValue('[name="hobby-description"]'),
    type: getHobbyValue('#hobbyType'),
    frequency: getHobbyValue('[name="practice-frequency"]'),
    season: getHobbyValue('[name="practice-season"]') || 'Qualquer período',
    hours: getHobbyValue('[name="weekly-hours"]') || '0',
    file: getHobbyField('#hobbyPoster')?.files?.[0]?.name || 'Sem arquivo',
    highlight: getHobbyField('.hobby-highlight-toggle input')?.checked ? 'Sim' : 'Não',
  }
}

function openHobbySuccess(payload) {
  openModal(`O hobby '${payload.title}' foi cadastrado com sucesso para treino de automação.`, {
    title: 'Hobby cadastrado',
    context: 'hobby',
    icon: 'HB',
    closeLabel: 'Ok',
    items: [
      { label: 'Tipo', value: payload.type },
      { label: 'Frequência', value: payload.frequency },
      { label: 'Temporada', value: payload.season },
      { label: 'Horas semanais', value: `${payload.hours}h` },
      { label: 'Arquivo', value: payload.file },
      { label: 'Destaque semanal', value: payload.highlight },
    ],
  })
}

function isEmail(email) {
  const normalized = email.trim().toLowerCase()
  if (ADMIN_EMAILS.includes(normalized)) return true

  const parts = normalized.split('@')

  if (parts.length !== 2) return false

  const [localPart, domain] = parts
  const validLocalPart = /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+$/.test(localPart) && !localPart.startsWith('.') && !localPart.endsWith('.') && !localPart.includes('..')

  return validLocalPart && ALLOWED_EMAIL_DOMAINS.includes(domain)
}

function isLocalAdmin(email, password) {
  return ADMIN_EMAILS.includes(email.toLowerCase()) && password === ADMIN_PASSWORD
}

function findLocalUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase()

  return getLocalUsers().find((user) => String(user.email || '').toLowerCase() === normalizedEmail)
}

function getLocalUserPassword(user) {
  const email = String(user.email || '').toLowerCase()
  return user.password || (ADMIN_EMAILS.includes(email) ? ADMIN_PASSWORD : '')
}

function findLocalUser(email, password) {
  const user = findLocalUserByEmail(email)
  if (!user) return null

  return getLocalUserPassword(user) === password ? user : null
}

function hasRegisteredEmail(email) {
  const normalizedEmail = email.trim().toLowerCase()
  return getLocalUsers().some((user) => String(user.email || '').toLowerCase() === normalizedEmail)
}

function getLocalUsers() {
  let users = JSON.parse(localStorage.getItem(STORE_USERS) || '[]')
  users = users.filter((user) => {
    const email = user.email?.toLowerCase()
    if (LEGACY_ADMIN_EMAILS.includes(email)) return false

    return ADMIN_EMAILS.includes(email) || isEmail(user.email || '')
  })

  ADMIN_EMAILS.forEach((email, index) => {
    if (!users.some((user) => user.email === email)) {
      users.unshift({
        id: index + 1,
        name: 'QA Admin Lab',
        email,
        password: ADMIN_PASSWORD,
        active: true,
      })
    }
  })

  localStorage.setItem(STORE_USERS, JSON.stringify(users))
  return users
}

function saveLocalUser(user) {
  if (!isEmail(user.email)) {
    return { error: EMAIL_ERROR }
  }

  const users = getLocalUsers()
  const exists = users.some((item) => item.email.toLowerCase() === user.email.toLowerCase())

  if (exists) {
    return { error: `O e-mail '${user.email.trim().toLowerCase()}' já está cadastrado na base local. Informe outro e-mail para continuar.` }
  }

  const newUser = {
    id: Date.now(),
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    password: user.password,
    active: true,
  }

  users.push(newUser)
  localStorage.setItem(STORE_USERS, JSON.stringify(users))
  return { user: newUser }
}

function deleteLocalUser(userId) {
  const users = getLocalUsers()
  const target = users.find((user) => String(user.id) === String(userId))

  if (!target) {
    return { error: 'Usuário não encontrado na massa local' }
  }

  if (ADMIN_EMAILS.includes(String(target.email || '').toLowerCase())) {
    return { error: 'Usuário administrador não pode ser excluído' }
  }

  const nextUsers = users.filter((user) => String(user.id) !== String(userId))
  localStorage.setItem(STORE_USERS, JSON.stringify(nextUsers))
  return { user: target }
}

async function request(path, options = {}) {
  const sessionToken = localStorage.getItem('token') || ''
  const authorization = sessionToken.split('.').length === 3 ? `Bearer ${sessionToken}` : ''

  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(authorization ? { Authorization: authorization } : {}),
        ...(options.headers || {}),
      },
      ...options,
    })

    const body = await response.json().catch(() => ({}))
    handleUnavailableApiSession(path, response)
    handleExpiredApiSession(path, response)
    return { response, body }
  } catch (error) {
    handleUnavailableApiSession(path)
    throw error
  }
}

function handleExpiredApiSession(path, response) {
  const isAuthenticationFailure = response.status === 401
  const isLoginRequest = path === '/api/auth/login'
  if (!isAuthenticationFailure || isLoginRequest) return
  endApiSession('Sessao expirada. Faca login novamente.', 'Sessao expirada')
}

function handleUnavailableApiSession(path, response) {
  const isLoginRequest = path === '/api/auth/login'
  const isServiceUnavailable = !response || response.status >= 500
  if (!isServiceUnavailable || isLoginRequest) return
  endApiSession('API indisponivel. Faca login novamente.', 'API indisponivel')
}

function endApiSession(message, sessionLabel) {
  const sessionToken = localStorage.getItem('token') || ''
  const hasApiSession = currentSessionMode === 'api' || sessionToken.split('.').length === 3

  if (!hasApiSession || sessionRedirectInProgress) return

  sessionRedirectInProgress = true
  currentSessionMode = 'local'
  apiAvailability = 'unknown'
  localStorage.removeItem('token')
  const sessionMode = getElement('[data-cy="session-mode"]')
  if (sessionMode) sessionMode.textContent = sessionLabel
  showToast(message, 'error')

  if (currentViewId !== 'loginView') showView('loginView', { replaceRoute: true })

  setTimeout(() => {
    sessionRedirectInProgress = false
  }, 1000)
}

function writeJsonResult(selector, payload) {
  getElement(selector).value = JSON.stringify(payload, null, 2)
}

function sanitizeSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '.')
    .replace(/^\.+|\.+$/g, '') || 'qa.lab'
}

function getSelectedTestDataExtras() {
  return Array.from(document.querySelectorAll('input[name="test-data-extra"]:checked')).map((input) => input.value)
}

function buildTestDataItem(index, profile, prefix, domain, extras) {
  const padded = String(index + 1).padStart(2, '0')
  const email = `${prefix}.${padded}@${domain}`
  const item = {
    id: `mass-${Date.now()}-${padded}`,
    profile,
    name: profile === 'empresa-qa' ? `QA Company ${padded}` : `Usuario QA ${padded}`,
    email,
  }

  if (extras.includes('login')) {
    item.password = 'pwd123'
  }

  if (extras.includes('telefone')) {
    item.phone = `(11) 9999${index}-100${index}`
  }

  if (extras.includes('documento')) {
    item.document = `000.000.00${index}-0${index}`
  }

  return item
}

function generateTestData() {
  const form = getElement('#testDataForm')
  clearFormErrors(form)

  const profileValid = requireField('testDataProfile', 'Selecione um perfil de massa')
  const quantityValid = requireField('testDataQuantity', 'Informe a quantidade')
  const prefixValid = requireField('testDataPrefix', 'Informe o prefixo do e-mail')
  const domainValid = requireField('testDataDomain', 'Selecione um dominio')
  const quantity = Number(getElement('#testDataQuantity').value)

  if (quantityValid && (quantity < 1 || quantity > 5)) {
    setError('testDataQuantity', 'Informe um valor entre 1 e 5')
    return
  }

  if (!profileValid || !quantityValid || !prefixValid || !domainValid) return

  const profile = getElement('#testDataProfile').value
  const prefix = sanitizeSlug(getElement('#testDataPrefix').value)
  const domain = getElement('#testDataDomain').value
  const extras = getSelectedTestDataExtras()
  const data = Array.from({ length: quantity }, (_, index) => buildTestDataItem(index, profile, prefix, domain, extras))

  writeJsonResult('#testDataOutput', {
    status: 'gerado',
    total: data.length,
    extras,
    data,
  })
  showToast('Massa de testes gerada')
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function getFilteredCheckoutProducts() {
  const search = getElement('#checkoutSearch')?.value.trim().toLowerCase() || ''
  const category = getElement('#checkoutCategory')?.value || 'todos'

  return CHECKOUT_PRODUCTS.filter((product) => {
    const matchesSearch = !search || product.name.toLowerCase().includes(search) || product.detail.toLowerCase().includes(search)
    const matchesCategory = category === 'todos' || product.category === category

    return matchesSearch && matchesCategory
  })
}

function getCheckoutSubtotal() {
  return checkoutCart.reduce((total, item) => total + item.price * item.quantity, 0)
}

function getCheckoutDiscount() {
  const subtotal = getCheckoutSubtotal()
  const couponRate = CHECKOUT_COUPONS[checkoutCoupon] || 0

  return subtotal * couponRate
}

function getCheckoutTotal() {
  return Math.max(getCheckoutSubtotal() - getCheckoutDiscount(), 0)
}

function getCheckoutPaymentLabel(payment) {
  const labels = {
    pix: 'Pix',
    credito: 'Cartao de credito',
    boleto: 'Boleto',
  }

  return labels[payment] || 'Nao informado'
}

function getCheckoutOrderCode() {
  return `QA-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
}

function getCheckoutSnapshot(payment) {
  return {
    orderCode: getCheckoutOrderCode(),
    payment,
    paymentLabel: getCheckoutPaymentLabel(payment),
    subtotal: getCheckoutSubtotal(),
    discount: getCheckoutDiscount(),
    total: getCheckoutTotal(),
    items: checkoutCart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  }
}

function getCardBrand(cardNumber = '') {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.startsWith('4')) return 'VISA'
  if (/^5[1-5]/.test(digits)) return 'MASTER'
  if (/^3[47]/.test(digits)) return 'AMEX'

  return 'QA CARD'
}

function formatCardNumber(value) {
  return String(value).replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function renderCheckoutProducts() {
  const productList = getElement('#checkoutProducts')
  if (!productList) return

  const products = getFilteredCheckoutProducts()

  if (!products.length) {
    productList.innerHTML = '<p class="checkout-empty">Nenhum produto encontrado.</p>'
    return
  }

  productList.innerHTML = products
    .map(
      (product) => `
        <article id="product-${product.id}" class="checkout-product-card" data-cy="product-card" data-product-id="${product.id}">
          <div class="checkout-product-head">
            <span class="checkout-product-badge" aria-hidden="true">${escapeHtml(product.badge)}</span>
            <div>
              <span class="section-kicker">${escapeHtml(product.categoryLabel)}</span>
              <h2>${escapeHtml(product.name)}</h2>
            </div>
          </div>
          <p>${escapeHtml(product.detail)}</p>
          <ul class="checkout-product-features" aria-label="Itens inclusos">
            ${product.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}
          </ul>
          <div class="checkout-product-footer">
            <div>
              <small>${escapeHtml(product.level)}</small>
              <strong>${formatCurrency(product.price)}</strong>
            </div>
            <button class="secondary-btn" data-cy="add-product" data-checkout-add="${product.id}" type="button" value="${product.id}">Adicionar</button>
          </div>
        </article>
      `,
    )
    .join('')
}

function renderCheckoutCart() {
  const cartList = getElement('#checkoutCart')
  if (!cartList) return

  if (!checkoutCart.length) {
    cartList.innerHTML = '<li class="checkout-empty">Carrinho vazio.</li>'
  } else {
    cartList.innerHTML = checkoutCart
      .map(
        (item) => `
          <li id="cart-${item.id}" data-cy="checkout-cart-item" data-cart-id="${item.id}">
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <small>${item.quantity} x ${formatCurrency(item.price)}</small>
            </div>
            <div class="checkout-quantity">
              <button type="button" data-cy="decrease-product" data-checkout-decrease="${item.id}" value="${item.id}" aria-label="Diminuir ${escapeHtml(item.name)}">-</button>
              <span data-cy="product-quantity">${item.quantity}</span>
              <button type="button" data-cy="increase-product" data-checkout-increase="${item.id}" value="${item.id}" aria-label="Aumentar ${escapeHtml(item.name)}">+</button>
            </div>
          </li>
        `,
      )
      .join('')
  }

  const subtotal = getCheckoutSubtotal()
  const discount = getCheckoutDiscount()
  getElement('#checkoutSubtotal').textContent = formatCurrency(subtotal)
  getElement('#checkoutDiscount').textContent = formatCurrency(discount)
  getElement('#checkoutTotal').textContent = formatCurrency(getCheckoutTotal())
}

function renderCheckout() {
  renderCheckoutProducts()
  renderCheckoutCart()
  renderCheckoutPaymentPreview()
}

function showCheckoutAlert(message) {
  const alert = getElement('#checkoutAlert')
  if (!alert) return

  alert.textContent = message
  alert.classList.remove('hidden')
}

function clearCheckoutAlert() {
  const alert = getElement('#checkoutAlert')
  if (!alert) return

  alert.textContent = ''
  alert.classList.add('hidden')
}

function getPixTimerLabel() {
  const remaining = Math.max(0, checkoutPixExpiresAt - Date.now())
  const totalSeconds = Math.ceil(remaining / 1000)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function updateCheckoutPixTimerText() {
  if (!checkoutPixExpiresAt) return

  const label = getPixTimerLabel()
  document.querySelectorAll('[data-pix-countdown]').forEach((element) => {
    element.textContent = element.dataset.pixCountdown === 'inline' ? `Expira em ${label}` : label
  })

  if (label !== '00:00') return
  clearInterval(checkoutPixTimer)
  checkoutPixTimer = null
}

function startCheckoutPixTimer() {
  if (!checkoutPixExpiresAt || checkoutPixExpiresAt <= Date.now()) {
    checkoutPixExpiresAt = Date.now() + 10 * 60 * 1000
  }

  updateCheckoutPixTimerText()
  if (checkoutPixTimer) return
  checkoutPixTimer = setInterval(updateCheckoutPixTimerText, 1000)
}

function stopCheckoutPixTimer() {
  clearInterval(checkoutPixTimer)
  checkoutPixTimer = null
  checkoutPixExpiresAt = 0
}

function updateCheckoutPaymentLayout(payment) {
  const view = getElement('#checkoutView')
  const layout = view?.querySelector('.checkout-layout')
  const hasPayment = Boolean(payment)

  view?.classList.toggle('checkout-expanded', hasPayment)
  layout?.classList.toggle('payment-expanded', hasPayment)
  layout?.classList.toggle('payment-card-expanded', payment === 'credito')
  layout?.classList.toggle('payment-boleto-expanded', payment === 'boleto')
  layout?.classList.toggle('payment-pix-expanded', payment === 'pix')
}

function renderCheckoutPaymentPreview() {
  const preview = getElement('#checkoutPaymentPreview')
  if (!preview) return

  const payment = getElement('#checkoutPayment')?.value || ''
  preview.className = 'checkout-payment-preview hidden'
  updateCheckoutPaymentLayout(payment)

  if (!payment) {
    stopCheckoutPixTimer()
    preview.innerHTML = ''
    return
  }

  preview.classList.remove('hidden')
  if (payment !== 'pix') stopCheckoutPixTimer()

  if (payment === 'pix') {
    startCheckoutPixTimer()
    preview.classList.add('pix-payment-preview')
    preview.innerHTML = `
      <section class="payment-preview-card" data-cy="payment-pix-preview">
        <div class="pix-qr" data-cy="pix-qr" aria-label="QR Code Pix ficticio"></div>
        <div>
          <span class="section-kicker">Pix copia e cola</span>
          <h3>Pagamento instantaneo</h3>
          <p>Use este bloco para validar QR Code, codigo Pix e tempo de expiracao.</p>
          <div class="payment-token-row">
            <strong data-cy="payment-pix-timer" data-pix-countdown="inline">Expira em ${getPixTimerLabel()}</strong>
            <code data-cy="pix-copy-code">00020126580014BR.GOV.BCB.PIX0136QA-AUTOMATION-LAB</code>
          </div>
        </div>
      </section>
    `
    updateCheckoutPixTimerText()
    return
  }

  if (payment === 'credito') {
    preview.classList.add('card-payment-preview')
    preview.innerHTML = `
      <section class="payment-preview-card" data-cy="payment-card-preview">
        <div class="credit-card-preview" data-cy="credit-card-preview">
          <div class="credit-card-top">
            <span class="card-chip" aria-hidden="true"></span>
            <span data-cy="card-brand">VISA</span>
          </div>
          <strong data-cy="card-preview-number">4111 1111 1111 1111</strong>
          <div class="credit-card-bottom">
            <small data-cy="card-preview-name">QA AUTOMATION</small>
            <small data-cy="card-preview-expiry">12/30</small>
          </div>
        </div>
        <div class="payment-card-fields">
          <div class="payment-card-field">
            <label for="checkout-card-number">Numero do cartao *</label>
            <input id="checkout-card-number" data-field="checkoutCardNumber" data-cy="checkout-card-number" name="checkout-card-number" value="4111 1111 1111 1111" inputmode="numeric" maxlength="19" />
            <p class="error" data-error-for="checkoutCardNumber"></p>
          </div>
          <div class="payment-card-field">
            <label for="checkout-card-name">Nome impresso *</label>
            <input id="checkout-card-name" data-field="checkoutCardName" data-cy="checkout-card-name" name="checkout-card-name" value="QA AUTOMATION" />
            <p class="error" data-error-for="checkoutCardName"></p>
          </div>
          <div class="payment-card-mini-grid">
            <div>
              <label for="checkout-card-expiry">Validade *</label>
              <input id="checkout-card-expiry" data-field="checkoutCardExpiry" data-cy="checkout-card-expiry" name="checkout-card-expiry" value="12/30" maxlength="5" />
              <p class="error" data-error-for="checkoutCardExpiry"></p>
            </div>
            <div>
              <label for="checkout-card-cvv">CVV *</label>
              <input id="checkout-card-cvv" data-field="checkoutCardCvv" data-cy="checkout-card-cvv" name="checkout-card-cvv" value="123" inputmode="numeric" maxlength="4" />
              <p class="error" data-error-for="checkoutCardCvv"></p>
            </div>
          </div>
        </div>
      </section>
    `
    updateCheckoutCardPreview()
    return
  }

  if (payment === 'boleto') {
    preview.classList.add('boleto-payment-preview')
    preview.innerHTML = `
      <section class="payment-preview-card" data-cy="payment-boleto-preview">
        <div class="boleto-mini">
          <span>341-7</span>
          <strong data-cy="boleto-preview-line">34191.79001 01043.510047 91020.150008 8 97370000018990</strong>
        </div>
        <div>
          <span class="section-kicker">Boleto bancario</span>
          <h3>Vencimento em 3 dias</h3>
          <p>Ao finalizar, o boleto completo abre em um modal com linha digitavel, codigo de barras e botao de pagamento.</p>
        </div>
      </section>
    `
  }
}

function updateCheckoutCardPreview() {
  const numberInput = getElement('#checkoutCardNumber')
  const nameInput = getElement('#checkoutCardName')
  const expiryInput = getElement('#checkoutCardExpiry')
  if (!numberInput) return

  numberInput.value = formatCardNumber(numberInput.value)
  const brand = getCardBrand(numberInput.value)
  const number = numberInput.value || '0000 0000 0000 0000'
  const name = nameInput?.value.trim().toUpperCase() || 'QA AUTOMATION'
  const expiry = expiryInput?.value.trim() || '12/30'

  getElement('[data-cy="card-brand"]').textContent = brand
  getElement('[data-cy="card-preview-number"]').textContent = number
  getElement('[data-cy="card-preview-name"]').textContent = name
  getElement('[data-cy="card-preview-expiry"]').textContent = expiry
}

function addCheckoutProduct(productId) {
  const product = CHECKOUT_PRODUCTS.find((item) => item.id === productId)
  if (!product) return

  clearCheckoutAlert()
  const cartItem = checkoutCart.find((item) => item.id === productId)
  if (cartItem) {
    cartItem.quantity += 1
  } else {
    checkoutCart.push({ ...product, quantity: 1 })
  }

  renderCheckoutCart()
  showToast('Produto adicionado ao carrinho')
}

function updateCheckoutQuantity(productId, direction) {
  const cartItem = checkoutCart.find((item) => item.id === productId)
  if (!cartItem) return

  cartItem.quantity += direction
  checkoutCart = checkoutCart.filter((item) => item.quantity > 0)
  if (checkoutCart.length) clearCheckoutAlert()
  renderCheckoutCart()
}

function applyCheckoutCoupon() {
  const couponField = getElement('#checkoutCoupon')
  const message = getElement('#checkoutCouponMessage')
  const coupon = couponField.value.trim().toUpperCase()

  if (!coupon) {
    checkoutCoupon = ''
    message.textContent = 'Nenhum cupom aplicado.'
    renderCheckoutCart()
    return
  }

  if (!CHECKOUT_COUPONS[coupon]) {
    checkoutCoupon = ''
    message.textContent = 'Cupom invalido. Tente QA10 ou E2E15.'
    renderCheckoutCart()
    return
  }

  checkoutCoupon = coupon
  couponField.value = coupon
  message.textContent = `Cupom ${coupon} aplicado com sucesso.`
  renderCheckoutCart()
}

function validateCheckoutCard() {
  const numberField = getElement('#checkoutCardNumber')
  const nameField = getElement('#checkoutCardName')
  const expiryField = getElement('#checkoutCardExpiry')
  const cvvField = getElement('#checkoutCardCvv')
  const numberDigits = numberField?.value.replace(/\D/g, '') || ''
  let valid = true

  if (!numberField || numberDigits.length < 16) {
    setError('checkoutCardNumber', 'Informe um cartao ficticio com 16 digitos')
    valid = false
  }

  if (!nameField?.value.trim()) {
    setError('checkoutCardName', 'Informe o nome impresso')
    valid = false
  }

  if (!/^\d{2}\/\d{2}$/.test(expiryField?.value.trim() || '')) {
    setError('checkoutCardExpiry', 'Use o formato MM/AA')
    valid = false
  }

  if (!/^\d{3,4}$/.test(cvvField?.value.trim() || '')) {
    setError('checkoutCardCvv', 'Informe 3 ou 4 digitos')
    valid = false
  }

  return valid
}

function openCheckoutPaymentFlow(payment, snapshot) {
  const modal = getElement('#paymentFlowModal')
  const content = getElement('#paymentFlowContent')
  const title = getElement('[data-cy="payment-flow-title"]')
  const copy = getElement('[data-cy="payment-flow-copy"]')
  const badge = getElement('[data-cy="payment-flow-badge"]')
  const confirmButton = getElement('[data-cy="payment-flow-confirm"]')
  const card = getElement('[data-cy="payment-flow-card"]')

  pendingCheckoutPayment = payment
  pendingCheckoutSnapshot = snapshot
  badge.textContent = payment === 'pix' ? 'PIX' : payment === 'credito' ? 'CARD' : 'BOL'
  card.dataset.payment = payment

  if (payment === 'pix') {
    startCheckoutPixTimer()
    title.textContent = 'Confirmar Pix'
    copy.textContent = 'Escaneie o QR Code ficticio ou valide o codigo copia e cola.'
    confirmButton.textContent = 'Confirmar Pix'
    content.innerHTML = `
      <section class="payment-flow-grid pix-flow" data-cy="pix-payment-flow">
        <div class="pix-qr large" data-cy="pix-modal-qr" aria-label="QR Code Pix ficticio"></div>
        <div class="payment-flow-details">
          <span class="section-kicker">Pedido ${escapeHtml(snapshot.orderCode)}</span>
          <h3>${formatCurrency(snapshot.total)}</h3>
          <p>Pagamento reservado por <strong data-cy="pix-modal-timer" data-pix-countdown="value">${getPixTimerLabel()}</strong>.</p>
          <code data-cy="pix-modal-code">00020126580014BR.GOV.BCB.PIX0136${escapeHtml(snapshot.orderCode)}520400005303986540${snapshot.total.toFixed(2)}</code>
        </div>
      </section>
    `
    updateCheckoutPixTimerText()
  }

  if (payment === 'credito') {
    const cardNumber = getElement('#checkoutCardNumber').value
    const cardName = getElement('#checkoutCardName').value
    const cardExpiry = getElement('#checkoutCardExpiry').value
    title.textContent = 'Confirmar cartao'
    copy.textContent = 'Valide o cartao ficticio antes de confirmar o pagamento.'
    confirmButton.textContent = 'Confirmar cartao'
    content.innerHTML = `
      <section class="payment-flow-grid card-flow" data-cy="card-payment-flow">
        <div class="credit-card-preview modal-card-preview">
          <div class="credit-card-top">
            <span class="card-chip" aria-hidden="true"></span>
            <span data-cy="modal-card-brand">${escapeHtml(getCardBrand(cardNumber))}</span>
          </div>
          <strong data-cy="modal-card-number">${escapeHtml(cardNumber)}</strong>
          <div class="credit-card-bottom">
            <small data-cy="modal-card-name">${escapeHtml(cardName.toUpperCase())}</small>
            <small data-cy="modal-card-expiry">${escapeHtml(cardExpiry)}</small>
          </div>
        </div>
        <div class="payment-flow-details">
          <span class="section-kicker">Autorizacao ficticia</span>
          <h3>${formatCurrency(snapshot.total)}</h3>
          <p data-cy="card-authorization-code">AUT-${escapeHtml(snapshot.orderCode)}</p>
          <p>Ao confirmar, o pedido sera aprovado e o modal de sucesso sera exibido.</p>
        </div>
      </section>
    `
  }

  if (payment === 'boleto') {
    title.textContent = 'Boleto bancario'
    copy.textContent = 'Confira os dados do boleto ficticio e clique em pagar.'
    confirmButton.textContent = 'Pagar boleto'
    content.innerHTML = `
      <section class="boleto-slip" data-cy="boleto-payment-flow">
        <header>
          <strong>341-7</strong>
          <span data-cy="boleto-line">34191.79001 01043.510047 91020.150008 8 97370000018990</span>
        </header>
        <dl>
          <div><dt>Beneficiario</dt><dd>QA Automation Lab LTDA</dd></div>
          <div><dt>Pagador</dt><dd>QA Admin Lab</dd></div>
          <div><dt>Documento</dt><dd>${escapeHtml(snapshot.orderCode)}</dd></div>
          <div><dt>Vencimento</dt><dd>15/06/2026</dd></div>
          <div><dt>Valor</dt><dd>${formatCurrency(snapshot.total)}</dd></div>
        </dl>
        <div class="boleto-barcode" data-cy="boleto-barcode" aria-label="Codigo de barras ficticio"></div>
      </section>
    `
  }

  modal.classList.remove('hidden')
}

function closeCheckoutPaymentFlow() {
  getElement('#paymentFlowModal').classList.add('hidden')
  getElement('[data-cy="payment-flow-card"]').removeAttribute('data-payment')
  pendingCheckoutPayment = ''
  pendingCheckoutSnapshot = null
}

function resetCheckoutAfterPayment() {
  getElement('#checkoutForm').reset()
  checkoutCart = []
  checkoutCoupon = ''
  clearCheckoutAlert()
  getElement('#checkoutCouponMessage').textContent = 'Nenhum cupom aplicado.'
  renderCheckoutCart()
  renderCheckoutPaymentPreview()
}

function completeCheckoutPayment() {
  if (!pendingCheckoutPayment || !pendingCheckoutSnapshot) return

  const payment = pendingCheckoutPayment
  const snapshot = pendingCheckoutSnapshot
  closeCheckoutPaymentFlow()
  resetCheckoutAfterPayment()

  const titles = {
    pix: 'Pix realizado com sucesso',
    credito: 'Cartao realizado com sucesso',
    boleto: 'Boleto pago com sucesso',
  }

  openModal('Pedido finalizado com sucesso. Fluxo completo de checkout validado.', {
    title: titles[payment],
    icon: payment === 'pix' ? 'PIX' : payment === 'credito' ? 'OK' : 'BOL',
    items: [
      { label: 'Pedido', value: snapshot.orderCode },
      { label: 'Pagamento', value: snapshot.paymentLabel },
      { label: 'Produtos', value: String(snapshot.items.length) },
      { label: 'Total', value: formatCurrency(snapshot.total) },
    ],
  })
}

function finishCheckout() {
  const form = getElement('#checkoutForm')
  clearFormErrors(form)
  clearCheckoutAlert()

  if (!checkoutCart.length) {
    getElement('#checkoutCouponMessage').textContent = 'Adicione pelo menos um produto ao carrinho.'
    showCheckoutAlert('Adicione pelo menos um produto ao carrinho antes de finalizar o pedido.')
    return
  }

  const paymentValid = requireField('checkoutPayment', 'Selecione a forma de pagamento')
  const termsValid = requireChecked('checkoutTerms', 'Confirme os dados do pedido')
  if (!paymentValid || !termsValid) {
    showCheckoutAlert('Revise os campos obrigatorios do checkout antes de finalizar.')
    return
  }

  const payment = getElement('#checkoutPayment').value
  if (payment === 'credito' && !validateCheckoutCard()) {
    showCheckoutAlert('Revise os dados do cartao ficticio para continuar.')
    return
  }

  openCheckoutPaymentFlow(payment, getCheckoutSnapshot(payment))
}

function completeLogin(user, mode, token = '') {
  currentSessionMode = mode
  apiAvailability = mode === 'api' ? 'online' : 'unknown'
  localStorage.setItem('token', mode === 'api' ? token : 'local-session')
  getElement('[data-cy="user-name"]').textContent = user.name || 'QA Automation Lab'
  getElement('[data-cy="user-email"]').textContent = user.email || ADMIN_EMAILS[0]
  getElement('[data-cy="session-mode"]').textContent = mode === 'api' ? 'API conectada' : 'Login local'
  showView('dashboardView')
}

document.addEventListener('click', (event) => {
  const backButton = event.target.closest('[data-back]')
  if (backButton) {
    goBackView()
    return
  }

  const featurePageButton = event.target.closest('[data-feature-page]')
  if (featurePageButton) {
    currentFeaturePage = Number(featurePageButton.dataset.featurePage)
    renderFeaturePagination()
    return
  }

  const targetButton = event.target.closest('[data-target]')
  if (targetButton) {
    showView(targetButton.dataset.target)
  }
})

window.addEventListener('popstate', () => {
  showView(getRouteView(), { fromHistory: true, skipRoute: true })
})

getElement('[data-cy="logout"]').addEventListener('click', () => {
  localStorage.removeItem('token')
  showView('loginView')
})

getElement('#loginForm').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const emailValid = requireField('loginEmail', 'E-mail é obrigatório')
  const passwordValid = requireField('loginPassword', 'Senha é obrigatória')
  const email = getElement('#loginEmail').value.trim()
  const password = getElement('#loginPassword').value.trim()

  if (emailValid && !isEmail(email)) {
    setError('loginEmail', EMAIL_ERROR)
    return
  }

  if (!emailValid || !passwordValid) return

  try {
    const { response, body } = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const authData = body.data || {}
      const apiUser = authData.user || authData
      completeLogin({ name: apiUser.name, email: apiUser.email || email }, 'api', authData.token)
      showToast('Login realizado com sucesso pela API')
      return
    }

    setError('loginPassword', body.error || 'E-mail ou senha inválidos')
  } catch (error) {
    const localUser = findLocalUser(email, password)

    if (localUser) {
      completeLogin(localUser, 'local')
      showToast('API indisponível: login local realizado', 'warning')
      return
    }

    setError('loginEmail', 'API indisponível e usuário não encontrado na massa local')
  }
})

getElement('#registerForm').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const nameValid = requireField('registerName', 'Nome é obrigatório')
  const emailValid = requireField('registerEmail', 'E-mail é obrigatório')
  const passwordValid = requireField('registerPassword', 'Senha é obrigatória')
  const email = getElement('#registerEmail').value.trim()

  if (emailValid && !isEmail(email)) {
    setError('registerEmail', EMAIL_ERROR)
    return
  }

  if (!nameValid || !emailValid || !passwordValid) return

  const user = {
    name: getElement('#registerName').value,
    email,
    password: getElement('#registerPassword').value,
  }

  try {
    const { response, body } = await request('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      openRegisterFeedback('error', body.error || 'Não foi possível cadastrar este usuário.')
      return
    }

    form.reset()
    openRegisterFeedback('success', user)
  } catch (error) {
    const result = saveLocalUser(user)

    if (result.error) {
      openRegisterFeedback('error', result.error)
      return
    }

    form.reset()
    openRegisterFeedback('success', result.user || user)
  }
})

getElement('#forgotForm').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const emailValid = requireField('forgotEmail', 'E-mail é obrigatório')
  const email = getElement('#forgotEmail').value.trim()

  if (emailValid && !isEmail(email)) {
    setError('forgotEmail', EMAIL_ERROR)
    return
  }

  if (!emailValid) return

  try {
    const { response, body } = await request('/api/password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      const token = body.data?.token
      getElement('#reset-token').value = token || ''
      getElement('[data-recovery-reset]').classList.remove('hidden')
      openRecoveryTokenModal(email, token)
      return
    }

    setError('forgotEmail', body.error || EMAIL_NOT_FOUND_ERROR)
  } catch (error) {
    if (hasRegisteredEmail(email)) {
      const token = generateRecoveryToken()
      getElement('#reset-token').value = token
      openRecoveryTokenModal(email, token)
      return
    }

    setError('forgotEmail', 'API indisponível para recuperar a senha')
  }
})

getElement('[data-form="resetPassword"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const tokenValid = requireField('resetToken', 'Token é obrigatório')
  const passwordValid = requireField('resetPassword', 'Nova senha é obrigatória')
  const confirmationValid = requireField('resetPasswordConfirmation', 'Confirmação é obrigatória')
  const password = getElement('#reset-password').value
  const confirmation = getElement('#reset-password-confirmation').value

  if (!tokenValid || !passwordValid || !confirmationValid) return

  if (password.length < 6) {
    setError('resetPassword', 'A senha deve ter pelo menos 6 caracteres')
    return
  }

  if (password !== confirmation) {
    setError('resetPasswordConfirmation', 'As senhas não conferem')
    return
  }

  try {
    const { response, body } = await request('/api/password/reset', {
      method: 'POST',
      body: JSON.stringify({
        token: getElement('#reset-token').value.trim(),
        newPassword: password,
      }),
    })

    if (!response.ok) {
      setError('resetToken', body.error || 'Não foi possível redefinir a senha')
      return
    }

    form.reset()
    form.classList.add('hidden')
    showView('loginView')
    openModal('Senha redefinida com sucesso. Você já pode entrar com a nova credencial.', {
      title: 'Senha atualizada',
      variant: 'success',
      closeLabel: 'Ir para login',
    })
  } catch (error) {
    setError('resetToken', 'API indisponível para redefinir a senha')
  }
})

getElement('#testDataForm').addEventListener('submit', (event) => {
  event.preventDefault()
  generateTestData()
})

getElement('#checkoutSearch').addEventListener('input', renderCheckoutProducts)

getElement('#checkoutCategory').addEventListener('change', renderCheckoutProducts)

getElement('#checkoutPayment').addEventListener('change', () => {
  clearFormErrors(getElement('#checkoutForm'))
  clearCheckoutAlert()
  renderCheckoutPaymentPreview()
})

getElement('#checkoutPaymentPreview').addEventListener('input', (event) => {
  if (!event.target.closest('.payment-card-fields')) return
  updateCheckoutCardPreview()
})

getElement('#checkoutProducts').addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-checkout-add]')
  if (!addButton) return

  addCheckoutProduct(addButton.dataset.checkoutAdd)
})

getElement('#checkoutCart').addEventListener('click', (event) => {
  const increaseButton = event.target.closest('[data-checkout-increase]')
  const decreaseButton = event.target.closest('[data-checkout-decrease]')

  if (increaseButton) {
    updateCheckoutQuantity(increaseButton.dataset.checkoutIncrease, 1)
    return
  }

  if (decreaseButton) {
    updateCheckoutQuantity(decreaseButton.dataset.checkoutDecrease, -1)
  }
})

getElement('[data-cy="checkout-apply-coupon"]').addEventListener('click', applyCheckoutCoupon)

getElement('#checkoutForm').addEventListener('submit', (event) => {
  event.preventDefault()
  finishCheckout()
})

getElement('[data-cy="payment-flow-cancel"]').addEventListener('click', closeCheckoutPaymentFlow)

getElement('[data-cy="payment-flow-confirm"]').addEventListener('click', completeCheckoutPayment)

getElement('#technologyInput').addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return
  event.preventDefault()

  const value = event.currentTarget.value.trim()
  if (!value) return

  tags.push(value)
  event.currentTarget.value = ''
  renderTags()
})

function renderTags() {
  const tagList = getElement('#technologyTags')
  tagList.innerHTML = tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')
}

function populateCharacterYears() {
  const select = getElement('#characterYear')
  if (!select || select.dataset.ready === 'true') return

  const currentYear = new Date().getFullYear()
  const startYear = 1930
  for (let year = currentYear; year >= startYear; year -= 1) {
    const option = document.createElement('option')
    option.value = String(year)
    option.textContent = String(year)
    select.appendChild(option)
  }

  select.dataset.ready = 'true'
}

function resetCharacterImageName() {
  const fileName = getElement('[data-cy="character-image-name"]')
  if (fileName) fileName.textContent = 'Nenhum arquivo escolhido'
}

function getCharacters() {
  const saved = JSON.parse(localStorage.getItem(STORE_CHARACTERS) || '[]')
  const cleanCharacters = saved.filter((character) => !String(character.id || '').startsWith('seed-'))

  if (localStorage.getItem(STORE_CHARACTERS_SEEDED) !== 'true') {
    const names = new Set(cleanCharacters.map((character) => String(character.name || '').toLowerCase()))
    const seeded = [...DEFAULT_CHARACTERS.filter((character) => !names.has(character.name.toLowerCase())), ...cleanCharacters]
    saveCharacters(seeded)
    localStorage.setItem(STORE_CHARACTERS_SEEDED, 'true')
    return seeded
  }

  if (cleanCharacters.length !== saved.length) {
    saveCharacters(cleanCharacters)
  }

  return cleanCharacters
}

function saveCharacters(characters) {
  localStorage.setItem(STORE_CHARACTERS, JSON.stringify(characters))
}

function getCharacterInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function setupCharacterManagement() {
  populateCharacterManagementFilters()
  renderCharacterManagement()
}

function populateCharacterManagementFilters() {
  const characters = getCharacters()
  const universeSelect = getElement('[data-testid="filter-universe"]')
  const yearSelect = getElement('[data-testid="filter-year"]')
  const currentUniverse = universeSelect.value
  const currentYear = yearSelect.value
  const universes = [...new Set(characters.map((character) => character.universe).filter(Boolean))].sort()
  const years = [...new Set(characters.map((character) => character.year).filter(Boolean))].sort((a, b) => Number(b) - Number(a))

  universeSelect.innerHTML = '<option value="">Todos os universos</option>'
  universes.forEach((universe) => {
    const option = document.createElement('option')
    option.value = universe
    option.textContent = universe
    universeSelect.appendChild(option)
  })
  universeSelect.value = universes.includes(currentUniverse) ? currentUniverse : ''

  yearSelect.innerHTML = '<option value="">Todos os anos</option>'
  years.forEach((year) => {
    const option = document.createElement('option')
    option.value = year
    option.textContent = year
    yearSelect.appendChild(option)
  })
  yearSelect.value = years.includes(currentYear) ? currentYear : ''
}

function getFilteredCharacters() {
  const search = getElement('[data-testid="search-character"]').value.trim().toLowerCase()
  const universe = getElement('[data-testid="filter-universe"]').value
  const year = getElement('[data-testid="filter-year"]').value

  return getCharacters().filter((character) => {
    const matchesSearch = !search || character.name.toLowerCase().includes(search)
    const matchesUniverse = !universe || character.universe === universe
    const matchesYear = !year || character.year === year
    return matchesSearch && matchesUniverse && matchesYear
  })
}

function renderCharacterManagement() {
  const filtered = getFilteredCharacters()
  const table = getElement('[data-testid="characters-table"]')
  const body = getElement('[data-role="charactersTableBody"]')
  const count = getElement('[data-testid="characters-count"]')
  const emptyState = getElement('[data-testid="empty-state"]')
  const pagination = getElement('[data-testid="pagination"]')
  const totalPages = Math.max(1, Math.ceil(filtered.length / CHARACTER_PAGE_SIZE))

  characterManagementPage = Math.min(Math.max(characterManagementPage, 1), totalPages)
  const start = (characterManagementPage - 1) * CHARACTER_PAGE_SIZE
  const visible = filtered.slice(start, start + CHARACTER_PAGE_SIZE)

  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`
  emptyState.hidden = filtered.length > 0
  table.classList.toggle('hidden', filtered.length === 0)

  body.innerHTML = visible
    .map(
      (character) => `
        <tr data-testid="character-row" data-character-title="${escapeHtml(character.name)}" data-character-id="${escapeHtml(character.id)}">
          <td>
            <span class="table-avatar" data-testid="character-avatar" aria-label="Imagem de ${escapeHtml(character.name)}">${escapeHtml(getCharacterInitials(character.name))}</span>
          </td>
          <td data-testid="character-name-cell">${escapeHtml(character.name)}</td>
          <td data-testid="character-universe-cell">${escapeHtml(character.universe)}</td>
          <td data-testid="character-year-cell">${escapeHtml(character.year)}</td>
          <td>
            <span class="status-badge ${character.featured ? 'featured' : 'standard'}" data-testid="character-featured-badge">${character.featured ? 'Destaque' : 'Padrao'}</span>
          </td>
          <td>
            <div class="row-actions">
              <button class="secondary-btn compact-btn" data-testid="view-character" data-character-action="view" data-character-id="${escapeHtml(character.id)}" type="button">Ver</button>
              <button class="secondary-btn compact-btn" data-testid="edit-character" data-character-action="edit" data-character-id="${escapeHtml(character.id)}" type="button">Editar</button>
              <button class="danger-btn compact-btn" data-testid="delete-character" data-character-action="delete" data-character-id="${escapeHtml(character.id)}" type="button">Excluir</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('')

  if (!filtered.length) {
    pagination.innerHTML = ''
    return
  }

  pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
    const page = index + 1
    const active = page === characterManagementPage
    return `<button class="page-btn${active ? ' active' : ''}" data-testid="page-${page}" data-character-page="${page}" type="button" aria-current="${active ? 'page' : 'false'}">${page}</button>`
  }).join('')
}

function openCharacterDeleteModal(characterId) {
  const character = getCharacters().find((item) => String(item.id) === String(characterId))
  if (!character) return

  pendingDeleteCharacterId = character.id
  getElement('[data-testid="delete-modal-description"]').textContent = `Deseja realmente excluir o personagem ${character.name}?`
  getElement('[data-testid="delete-modal"]').hidden = false
}

function closeCharacterDeleteModal() {
  pendingDeleteCharacterId = null
  getElement('[data-testid="delete-modal"]').hidden = true
}

function openCharacterEditModal(characterId) {
  const character = getCharacters().find((item) => String(item.id) === String(characterId))
  if (!character) return

  pendingEditCharacterId = character.id
  getElement('#editCharacterName').value = character.name
  getElement('#editCharacterStory').value = character.story
  getElement('#editCharacterUniverse').value = character.universe
  getElement('#editCharacterYear').value = character.year
  getElement('#editCharacterFeatured').checked = Boolean(character.featured)
  clearFormErrors(getElement('#editCharacterForm'))
  getElement('[data-testid="edit-modal"]').hidden = false
}

function closeCharacterEditModal() {
  pendingEditCharacterId = null
  getElement('[data-testid="edit-modal"]').hidden = true
}

function showManagementToast(selector, message) {
  const toastElement = getElement(selector)
  toastElement.textContent = message
  toastElement.classList.remove('hidden')
  setTimeout(() => toastElement.classList.add('hidden'), 3600)
}

getElement('#contactForm').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)
  setError('priority', '')
  setError('channels', '')

  const required = [
    ['contactName', 'Nome é obrigatório'],
    ['contactEmail', 'E-mail é obrigatório'],
    ['contactPhone', 'Telefone é obrigatório'],
    ['contactCompany', 'Empresa ou time é obrigatório'],
    ['contactDocument', 'Documento é obrigatório'],
    ['contactDate', 'Data desejada é obrigatória'],
    ['contactSubject', 'Tipo de automação é obrigatório'],
    ['contactLevel', 'Nível do cenário é obrigatório'],
    ['contactBrowser', 'Navegador alvo é obrigatório'],
    ['contactExecution', 'Modo de execução é obrigatório'],
    ['contactEnvironment', 'Ambiente é obrigatório'],
    ['contactMessage', 'Mensagem é obrigatória'],
  ]

  const valid = required.map(([id, message]) => requireField(id, message)).every(Boolean)
  const email = getElement('#contactEmail').value.trim()
  const documentDigits = getElement('#contactDocument').value.replace(/\D/g, '')
  const priority = getElement('input[name="priority"]:checked')
  const selectedChannels = Array.from(document.querySelectorAll('input[name="channels"]:checked')).map((item) => item.value)
  const termsValid = requireChecked('contactTerms', 'Voce precisa aceitar os termos')

  if (email && !isEmail(email)) {
    setError('contactEmail', EMAIL_ERROR)
    return
  }

  if (documentDigits && ![11, 14].includes(documentDigits.length)) {
    setError('contactDocument', 'Informe um CPF com 11 digitos ou CNPJ com 14 digitos')
    return
  }

  if (!priority) {
    setError('priority', 'Selecione uma prioridade')
  }

  if (!selectedChannels.length) {
  setError('channels', 'Selecione pelo menos um canal de validação')
  }

  if (!valid || !priority || !selectedChannels.length || !termsValid) return

  const formData = {
    name: getElement('#contactName').value.trim(),
    email,
    phone: getElement('#contactPhone').value.trim(),
    company: getElement('#contactCompany').value.trim(),
    document: getElement('#contactDocument').value.trim(),
    requestedDate: getElement('#contactDate').value,
    subject: getElement('#contactSubject').value,
    level: getElement('#contactLevel').value,
    browser: getElement('#contactBrowser').value,
    execution: getElement('#contactExecution').value,
    environment: getElement('#contactEnvironment').value,
    apiPath: getElement('#contactApiPath').value.trim(),
    message: getElement('#contactMessage').value.trim(),
    priority: priority.value,
    channels: selectedChannels,
    tags: [...tags],
  }

  try {
    await request('/api/forms/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  } catch (error) {
    const forms = JSON.parse(localStorage.getItem(STORE_FORMS) || '[]')
    forms.push({ ...formData, createdAt: new Date().toISOString() })
    localStorage.setItem(STORE_FORMS, JSON.stringify(forms))
  }

  form.reset()
  tags.length = 0
  renderTags()
  openModal('Formulário enviado com sucesso. Fluxo pronto para validar modal, campos e mensagem.')
})

getElement('#characterImage').addEventListener('change', (event) => {
  const fileName = getElement('[data-cy="character-image-name"]')
  const file = event.currentTarget.files?.[0]
  fileName.textContent = file ? file.name : 'Nenhum arquivo escolhido'
})

getElement('#characterForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const required = [
    ['characterName', 'Por favor, informe o nome do personagem.'],
    ['characterStory', 'Por favor, informe a história do personagem.'],
    ['characterUniverse', 'Por favor, selecione o universo ou franquia.'],
    ['characterYear', 'Por favor, selecione o ano de estreia.'],
  ]
  const valid = required.map(([id, message]) => requireField(id, message)).every(Boolean)
  if (!valid) return

  const character = {
    id: Date.now(),
    name: getElement('#characterName').value.trim(),
    story: getElement('#characterStory').value.trim(),
    universe: getElement('#characterUniverse').value,
    year: getElement('#characterYear').value,
    image: getElement('#characterImage').files?.[0]?.name || '',
    featured: getElement('#characterFeatured').checked,
    createdAt: new Date().toISOString(),
  }
  const characters = getCharacters()
  characters.push(character)
  saveCharacters(characters)

  getElement('[data-cy="character-result"]').textContent = `Personagem cadastrado: ${character.name} (${character.universe})`
  form.reset()
  resetCharacterImageName()
  openModal('Personagem cadastrado com sucesso. Massa pronta para validar cadastro de personagens.', {
    title: 'Cadastro realizado',
  })
})

getElement('[data-testid="search-character"]').addEventListener('input', () => {
  clearTimeout(characterSearchTimer)
  characterSearchTimer = setTimeout(() => {
    characterManagementPage = 1
    renderCharacterManagement()
  }, 180)
})

getElement('[data-testid="filter-universe"]').addEventListener('change', () => {
  characterManagementPage = 1
  renderCharacterManagement()
})

getElement('[data-testid="filter-year"]').addEventListener('change', () => {
  characterManagementPage = 1
  renderCharacterManagement()
})

getElement('[data-testid="clear-character-filters"]').addEventListener('click', () => {
  getElement('[data-testid="search-character"]').value = ''
  getElement('[data-testid="filter-universe"]').value = ''
  getElement('[data-testid="filter-year"]').value = ''
  characterManagementPage = 1
  renderCharacterManagement()
})

getElement('[data-testid="pagination"]').addEventListener('click', (event) => {
  const pageButton = event.target.closest('[data-character-page]')
  if (!pageButton) return

  characterManagementPage = Number(pageButton.dataset.characterPage)
  renderCharacterManagement()
})

getElement('[data-role="charactersTableBody"]').addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-character-action]')
  if (!actionButton) return

  const character = getCharacters().find((item) => String(item.id) === String(actionButton.dataset.characterId))
  if (!character) return

  if (actionButton.dataset.characterAction === 'delete') {
    openCharacterDeleteModal(character.id)
    return
  }

  if (actionButton.dataset.characterAction === 'view') {
    openModal(`${character.name} pertence ao universo ${character.universe} e estreou em ${character.year}.`, {
      title: 'Detalhes do personagem',
    })
    return
  }

  openCharacterEditModal(character.id)
})

getElement('[data-testid="cancel-delete"]').addEventListener('click', closeCharacterDeleteModal)

getElement('[data-testid="cancel-edit"]').addEventListener('click', closeCharacterEditModal)

getElement('#editCharacterForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const required = [
    ['editCharacterName', 'Por favor, informe o nome do personagem.'],
    ['editCharacterStory', 'Por favor, informe a história do personagem.'],
    ['editCharacterUniverse', 'Por favor, selecione o universo.'],
    ['editCharacterYear', 'Por favor, informe o ano.'],
  ]
  const valid = required.map(([id, message]) => requireField(id, message)).every(Boolean)
  if (!valid) return

  const characters = getCharacters()
  const index = characters.findIndex((item) => String(item.id) === String(pendingEditCharacterId))
  if (index === -1) {
    closeCharacterEditModal()
    return
  }

  const updated = {
    ...characters[index],
    name: getElement('#editCharacterName').value.trim(),
    story: getElement('#editCharacterStory').value.trim(),
    universe: getElement('#editCharacterUniverse').value,
    year: getElement('#editCharacterYear').value.trim(),
    featured: getElement('#editCharacterFeatured').checked,
    updatedAt: new Date().toISOString(),
  }

  characters[index] = updated
  saveCharacters(characters)
  closeCharacterEditModal()
  populateCharacterManagementFilters()
  renderCharacterManagement()
  showManagementToast('[data-testid="edit-toast-success"]', `Personagem atualizado com sucesso: ${updated.name}`)
  showToast('Personagem atualizado com sucesso')
})

getElement('[data-testid="confirm-delete"]').addEventListener('click', () => {
  const character = getCharacters().find((item) => String(item.id) === String(pendingDeleteCharacterId))
  if (!character) {
    closeCharacterDeleteModal()
    return
  }

  const nextCharacters = getCharacters().filter((item) => String(item.id) !== String(pendingDeleteCharacterId))
  saveCharacters(nextCharacters)
  closeCharacterDeleteModal()
  populateCharacterManagementFilters()
  renderCharacterManagement()
  showManagementToast('[data-testid="delete-toast-success"]', `Personagem excluído com sucesso: ${character.name}`)
  showToast('Personagem excluído com sucesso')
})

getElement('[data-cy="refresh-users"]').addEventListener('click', loadUsers)

async function loadUsers() {
  const table = getElement('[data-cy="users-table"]')
  table.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>'

  try {
    const { response, body } = await request('/api/users')

    if (response.ok) {
      const users = Array.isArray(body) ? body : body.data || []
      renderUsers(users)
      return
    }

    renderUsers(getLocalUsers())
  } catch (error) {
    renderUsers(getLocalUsers())
  }
}

function renderUsers(users) {
  const table = getElement('[data-cy="users-table"]')

  if (!users.length) {
    table.innerHTML = '<tr><td colspan="5">Nenhum usuário cadastrado</td></tr>'
    return
  }

  table.innerHTML = users
    .map(
      (user) => {
        const isAdmin = ADMIN_EMAILS.includes(String(user.email || '').toLowerCase())

        return `
        <tr>
          <td>${escapeHtml(user.id)}</td>
          <td>${escapeHtml(user.name)}</td>
          <td>${escapeHtml(user.email)}</td>
          <td>${user.active === false ? 'Inativo' : 'Ativo'}</td>
          <td>
            <button class="danger-btn" data-delete-user="${escapeHtml(user.id)}" type="button" ${isAdmin ? 'disabled' : ''}>
              Excluir
            </button>
          </td>
        </tr>
      `
      },
    )
    .join('')
}

getElement('[data-cy="users-table"]').addEventListener('click', async (event) => {
  const deleteButton = event.target.closest('[data-delete-user]')
  if (!deleteButton || deleteButton.disabled) return

  const resultText = getElement('[data-cy="users-result"]')

  try {
    const { response, body } = await request(`/api/users/${deleteButton.dataset.deleteUser}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      resultText.textContent = body.error || 'Não foi possível excluir o usuário'
      showToast(resultText.textContent, 'error')
      return
    }

    resultText.textContent = `Usuário excluído com sucesso: ${body.data.email}`
    showToast('Usuário excluído com sucesso')
    await loadUsers()
  } catch (error) {
    resultText.textContent = 'API indisponível para excluir o usuário'
    showToast(resultText.textContent, 'error')
  }
})

function getClientFilters() {
  const search = getElement('[data-cy="clients-search"]').value.trim()
  const status = getElement('[data-cy="clients-status-filter"]').value
  const params = new URLSearchParams()

  if (search) params.set('search', search)
  if (status) params.set('status', status)
  return params.toString()
}

function setClientsApiStatus(state, label) {
  const badge = getElement('[data-cy="clients-api-status"]')
  badge.dataset.state = state
  badge.textContent = label
}

function setClientFeedback(state, title, message, options = {}) {
  const feedback = getElement('[data-cy="clients-feedback"]')
  feedback.dataset.state = state
  getElement('[data-cy="clients-feedback-title"]').textContent = title
  getElement('[data-cy="clients-feedback-message"]').textContent = message
  getElement('[data-cy="clients-retry"]').classList.toggle('hidden', !options.retry)
}

function getClientErrorMessage(response, body, fallback) {
  if (response.status === 401) return 'Sessão ausente ou expirada. Faça login novamente pela API.'
  if (response.status === 404) return 'Cliente não encontrado. Atualize a lista e tente novamente.'
  if (response.status === 409 && String(body.error || '').toLowerCase().includes('document')) return 'CPF ou CNPJ já cadastrado.'
  if (response.status === 409) return 'E-mail já cadastrado.'
  if (response.status === 503) return 'PostgreSQL indisponível. Verifique o Docker e tente novamente.'
  return body.error || fallback
}

function renderClientsTableState(message, state = 'empty') {
  getElement('[data-cy="clients-table-body"]').innerHTML = `
    <tr class="table-state ${escapeHtml(state)}">
      <td colspan="6">${escapeHtml(message)}</td>
    </tr>
  `
}

function reportClientResponseError(response, body, fallback) {
  const message = getClientErrorMessage(response, body, fallback)
  const authenticationError = response.status === 401
  const apiFailure = response.status >= 500

  setClientsApiStatus(apiFailure ? 'offline' : 'online', apiFailure ? 'Falha' : 'API online')
  setClientFeedback(
    apiFailure ? 'error' : 'warning',
    authenticationError ? 'Autenticação necessária' : apiFailure ? 'Serviço indisponível' : 'Dados não aceitos',
    message,
    { retry: apiFailure },
  )
  getElement('[data-cy="client-result"]').textContent = message
  showToast(message, 'error')
  return message
}

async function loadClients(options = {}) {
  const table = getElement('[data-cy="clients-table-body"]')
  const query = getClientFilters()
  setClientsApiStatus('checking', 'Verificando')
  renderClientsTableState('Carregando clientes...', 'loading')
  if (!options.silent) {
    setClientFeedback('loading', 'Sincronizando dados', 'Consultando clientes na API e no PostgreSQL.')
  }

  try {
    const { response, body } = await request(`/api/clients${query ? `?${query}` : ''}`)

    if (!response.ok) {
      clientsCache = []
      getElement('[data-cy="clients-count"]').textContent = '0'
      const message = reportClientResponseError(response, body, 'Não foi possível carregar os clientes.')
      renderClientsTableState(message, 'error')
      return
    }

    clientsCache = Array.isArray(body) ? body : body.data || []
    renderClients(clientsCache)
    setClientsApiStatus('online', 'API online')

    if (!options.silent) {
      const hasFilters = Boolean(query)
      setClientFeedback(
        clientsCache.length || !hasFilters ? 'success' : 'warning',
        clientsCache.length ? 'Base sincronizada' : hasFilters ? 'Nenhum resultado' : 'Base conectada',
        clientsCache.length
          ? `${clientsCache.length} cliente(s) carregado(s) do PostgreSQL.`
          : hasFilters
            ? 'Nenhum cliente corresponde aos filtros informados.'
            : 'A API está online e ainda não existem clientes cadastrados.',
      )
    }
  } catch (error) {
    clientsCache = []
    getElement('[data-cy="clients-count"]').textContent = '0'
    const message = 'API indisponível. Inicie a API e o Docker antes de consultar clientes.'
    renderClientsTableState(message, 'error')
    setClientsApiStatus('offline', 'Indisponível')
    setClientFeedback('error', 'Sem conexão com a API', message, { retry: true })
    getElement('[data-cy="client-result"]').textContent = message
  }
}

function renderClients(clients) {
  const table = getElement('[data-cy="clients-table-body"]')
  getElement('[data-cy="clients-count"]').textContent = String(clients.length)

  if (!clients.length) {
    renderClientsTableState('Nenhum cliente encontrado.')
    return
  }

  table.innerHTML = clients
    .map(
      (client) => `
        <tr data-client-row="${escapeHtml(client.id)}" data-cy="client-row-${escapeHtml(client.id)}">
          <td>${escapeHtml(client.id)}</td>
          <td>
            <strong>${escapeHtml(client.name)}</strong>
            <small>${escapeHtml(client.email)}</small>
            <small>${escapeHtml(client.company || 'Sem empresa')}</small>
          </td>
          <td>${escapeHtml(formatDocument(client.document))}</td>
          <td>${escapeHtml(formatPhone(client.phone))}</td>
          <td><span class="status-badge ${escapeHtml(client.status)}">${client.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-client-action="edit" data-client-id="${escapeHtml(client.id)}" data-cy="client-edit-${escapeHtml(client.id)}" type="button">Editar</button>
              <button class="secondary-btn" data-client-action="status" data-client-id="${escapeHtml(client.id)}" data-cy="client-status-${escapeHtml(client.id)}" type="button">${client.status === 'active' ? 'Inativar' : 'Ativar'}</button>
              <button class="danger-btn" data-client-action="delete" data-client-id="${escapeHtml(client.id)}" data-cy="client-delete-${escapeHtml(client.id)}" type="button">Excluir</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('')
}

function resetClientForm(options = {}) {
  const form = getElement('[data-form="client"]')
  form.reset()
  clearFormErrors(form)
  editingClientId = null
  getElement('[data-field="clientId"]').value = ''
  getElement('[data-cy="client-form-title"]').textContent = 'Novo cliente'
  getElement('[data-cy="client-submit"]').textContent = 'Cadastrar cliente'
  getElement('[data-cy="client-cancel-edit"]').classList.add('hidden')
  if (!options.preserveResult) {
    getElement('[data-cy="client-result"]').textContent = options.message || 'Preencha os dados para iniciar.'
  }
}

async function startClientEdit(clientId, actionButton) {
  actionButton.disabled = true
  actionButton.textContent = 'Carregando...'
  setClientFeedback('loading', 'Carregando cliente', `Consultando o registro #${clientId} pela API.`)

  try {
    const { response, body } = await request(`/api/clients/${clientId}`)

    if (!response.ok) {
      reportClientResponseError(response, body, 'Não foi possível carregar o cliente para edição.')
      return
    }

    const client = body.data
    const cachedIndex = clientsCache.findIndex((item) => Number(item.id) === Number(client.id))
    if (cachedIndex >= 0) clientsCache[cachedIndex] = client

    editingClientId = client.id
    getElement('[data-field="clientId"]').value = client.id
    getElement('[data-field="clientName"]').value = client.name
    getElement('[data-field="clientEmail"]').value = client.email
    getElement('[data-field="clientDocument"]').value = formatDocument(client.document)
    getElement('[data-field="clientPhone"]').value = formatPhone(client.phone)
    getElement('[data-field="clientCompany"]').value = client.company || ''
    getElement('[data-field="clientStatus"]').value = client.status
    getElement('[data-cy="client-form-title"]').textContent = `Editar cliente #${client.id}`
    getElement('[data-cy="client-submit"]').textContent = 'Salvar alterações'
    getElement('[data-cy="client-cancel-edit"]').classList.remove('hidden')
    getElement('[data-cy="client-result"]').textContent = `Editando cliente: ${client.name}`
    setClientFeedback('success', 'Cliente carregado', `O registro #${client.id} está pronto para edição.`)
    getElement('[data-form="client"]').scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (error) {
    const message = 'API indisponível durante a consulta do cliente.'
    setClientsApiStatus('offline', 'Indisponível')
    setClientFeedback('error', 'Falha ao abrir edição', message, { retry: true })
    getElement('[data-cy="client-result"]').textContent = message
    showToast(message, 'error')
  } finally {
    actionButton.disabled = false
    actionButton.textContent = 'Editar'
  }
}

getElement('[data-form="client"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const requiredFields = [
    ['clientName', 'Nome é obrigatório'],
    ['clientEmail', 'E-mail é obrigatório'],
    ['clientDocument', 'CPF ou CNPJ é obrigatório'],
    ['clientPhone', 'Telefone é obrigatório'],
  ]
  const valid = requiredFields.map(([field, message]) => requireField(field, message)).every(Boolean)
  const email = getElement('[data-field="clientEmail"]').value.trim()
  const document = getElement('[data-field="clientDocument"]').value.replace(/\D/g, '')
  const phone = getElement('[data-field="clientPhone"]').value.replace(/\D/g, '')

  if (email && !isEmail(email)) setError('clientEmail', EMAIL_ERROR)
  if (document && ![11, 14].includes(document.length)) setError('clientDocument', 'Informe CPF com 11 ou CNPJ com 14 dígitos')
  if (phone && ![10, 11].includes(phone.length)) setError('clientPhone', 'Informe telefone com 10 ou 11 dígitos')
  if (!valid || !isEmail(email) || ![11, 14].includes(document.length) || ![10, 11].includes(phone.length)) {
    setClientFeedback('warning', 'Revise o formulário', 'Existem campos obrigatórios ou dados inválidos antes do envio.')
    getElement('[data-cy="client-result"]').textContent = 'Corrija os campos destacados para continuar.'
    return
  }

  const payload = {
    name: getElement('[data-field="clientName"]').value.trim(),
    email,
    document,
    phone,
    company: getElement('[data-field="clientCompany"]').value.trim(),
    status: getElement('[data-field="clientStatus"]').value,
  }
  const path = editingClientId ? `/api/clients/${editingClientId}` : '/api/clients'
  const method = editingClientId ? 'PUT' : 'POST'
  const wasEditing = Boolean(editingClientId)
  const submitButton = getElement('[data-cy="client-submit"]')
  submitButton.disabled = true
  submitButton.textContent = wasEditing ? 'Salvando alterações...' : 'Cadastrando...'
  setClientFeedback('loading', wasEditing ? 'Atualizando cliente' : 'Cadastrando cliente', 'Enviando os dados para a API e o PostgreSQL.')

  try {
    const { response, body } = await request(path, { method, body: JSON.stringify(payload) })

    if (!response.ok) {
      reportClientResponseError(response, body, 'Não foi possível salvar o cliente.')
      return
    }

    const successMessage = wasEditing
      ? `Cliente atualizado com sucesso: ${body.data.name}`
      : `Cliente cadastrado com sucesso: ${body.data.name}`
    resetClientForm({ preserveResult: true })
    await loadClients({ silent: true })
    getElement('[data-cy="client-result"]').textContent = successMessage
    setClientFeedback('success', wasEditing ? 'Alterações salvas' : 'Cliente cadastrado', successMessage)
    showToast(wasEditing ? 'Cliente atualizado com sucesso' : 'Cliente cadastrado com sucesso')
  } catch (error) {
    const message = 'API indisponível para salvar o cliente. Verifique os serviços e tente novamente.'
    setClientsApiStatus('offline', 'Indisponível')
    setClientFeedback('error', 'Falha de conexão', message, { retry: true })
    getElement('[data-cy="client-result"]').textContent = message
    showToast(message, 'error')
  } finally {
    submitButton.disabled = false
    submitButton.textContent = editingClientId ? 'Salvar alterações' : 'Cadastrar cliente'
  }
})

getElement('[data-cy="client-cancel-edit"]').addEventListener('click', () => {
  resetClientForm({ message: 'Edição cancelada. Nenhuma alteração foi enviada.' })
  setClientFeedback('success', 'Edição cancelada', 'O formulário voltou ao modo de cadastro.')
})

getElement('[data-cy="clients-refresh"]').addEventListener('click', loadClients)
getElement('[data-cy="clients-retry"]').addEventListener('click', loadClients)

getElement('[data-cy="clients-clear-filters"]').addEventListener('click', () => {
  getElement('[data-cy="clients-search"]').value = ''
  getElement('[data-cy="clients-status-filter"]').value = ''
  loadClients()
})

getElement('[data-cy="clients-status-filter"]').addEventListener('change', loadClients)

getElement('[data-cy="clients-search"]').addEventListener('input', () => {
  clearTimeout(clientSearchTimer)
  clientSearchTimer = setTimeout(loadClients, 280)
})

getElement('[data-cy="clients-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-client-action]')
  if (!button) return

  const clientId = Number(button.dataset.clientId)
  if (!Number.isFinite(clientId)) return

  if (button.dataset.clientAction === 'edit') {
    await startClientEdit(clientId, button)
    return
  }

  const client = clientsCache.find((item) => Number(item.id) === clientId)
  if (!client) return

  if (button.dataset.clientAction === 'delete') {
    pendingDeleteClientId = clientId
    getElement('[data-cy="client-delete-message"]').textContent = `Deseja realmente excluir o cliente ${client.name}?`
    getElement('[data-cy="client-delete-error"]').textContent = ''
    getElement('#clientDeleteModal').classList.remove('hidden')
    return
  }

  if (button.dataset.clientAction === 'status') {
    button.disabled = true
    const originalLabel = button.textContent
    button.textContent = 'Atualizando...'

    try {
      const status = client.status === 'active' ? 'inactive' : 'active'
      const { response, body } = await request(`/api/clients/${clientId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        reportClientResponseError(response, body, 'Não foi possível atualizar o status.')
        return
      }

      await loadClients({ silent: true })
      const message = `Cliente ${status === 'active' ? 'ativado' : 'inativado'} com sucesso: ${client.name}`
      getElement('[data-cy="client-result"]').textContent = message
      setClientFeedback('success', 'Status atualizado', message)
      showToast(message)
    } catch (error) {
      const message = 'API indisponível durante a atualização do status.'
      setClientsApiStatus('offline', 'Indisponível')
      setClientFeedback('error', 'Falha de conexão', message, { retry: true })
      showToast(message, 'error')
    } finally {
      button.disabled = false
      button.textContent = originalLabel
    }
  }
})

getElement('[data-cy="client-delete-cancel"]').addEventListener('click', () => {
  pendingDeleteClientId = null
  getElement('[data-cy="client-delete-error"]').textContent = ''
  getElement('#clientDeleteModal').classList.add('hidden')
})

getElement('[data-cy="client-delete-confirm"]').addEventListener('click', async () => {
  if (!pendingDeleteClientId) return
  const clientId = pendingDeleteClientId
  const confirmButton = getElement('[data-cy="client-delete-confirm"]')
  confirmButton.disabled = true
  confirmButton.textContent = 'Excluindo...'
  getElement('[data-cy="client-delete-error"]').textContent = ''

  try {
    const { response, body } = await request(`/api/clients/${clientId}`, { method: 'DELETE' })

    if (!response.ok) {
      const message = reportClientResponseError(response, body, 'Não foi possível excluir o cliente.')
      getElement('[data-cy="client-delete-error"]').textContent = message
      return
    }

    const message = `Cliente excluído com sucesso: ${body.data.name}`
    if (Number(editingClientId) === Number(clientId)) resetClientForm({ preserveResult: true })
    await loadClients({ silent: true })
    getElement('[data-cy="client-result"]').textContent = message
    setClientFeedback('success', 'Cliente excluído', message)
    showToast('Cliente excluído com sucesso')
    pendingDeleteClientId = null
    getElement('#clientDeleteModal').classList.add('hidden')
  } catch (error) {
    const message = 'API indisponível durante a exclusão do cliente.'
    getElement('[data-cy="client-delete-error"]').textContent = message
    setClientsApiStatus('offline', 'Indisponível')
    setClientFeedback('error', 'Falha de conexão', message, { retry: true })
    showToast(message, 'error')
  } finally {
    confirmButton.disabled = false
    confirmButton.textContent = 'Confirmar exclusão'
  }
})

function getContractFilters() {
  const search = getElement('[data-cy="contracts-search"]').value.trim()
  const status = getElement('[data-cy="contracts-status-filter"]').value
  const params = new URLSearchParams()

  if (search) params.set('search', search)
  if (status) params.set('status', status)
  return params.toString()
}

function setContractsApiStatus(state, label) {
  const badge = getElement('[data-cy="contracts-api-status"]')
  badge.dataset.state = state
  badge.textContent = label
}

function setContractFeedback(state, title, message, options = {}) {
  const feedback = getElement('[data-cy="contracts-feedback"]')
  feedback.dataset.state = state
  getElement('[data-cy="contracts-feedback-title"]').textContent = title
  getElement('[data-cy="contracts-feedback-message"]').textContent = message
  getElement('[data-cy="contracts-retry"]').classList.toggle('hidden', !options.retry)
}

function getContractErrorMessage(response, body, fallback) {
  if (response.status === 401) return 'Sessao ausente ou expirada. Faca login novamente pela API.'
  if (response.status === 404) return body.error || 'Contrato ou cliente nao encontrado.'
  if (response.status === 503) return 'PostgreSQL indisponivel. Verifique o Docker e tente novamente.'
  return body.error || fallback
}

function reportContractResponseError(response, body, fallback) {
  const message = getContractErrorMessage(response, body, fallback)
  const authenticationError = response.status === 401
  const apiFailure = response.status >= 500

  setContractsApiStatus(apiFailure ? 'offline' : 'online', apiFailure ? 'Falha' : 'API online')
  setContractFeedback(
    apiFailure ? 'error' : 'warning',
    authenticationError ? 'Autenticacao necessaria' : apiFailure ? 'Servico indisponivel' : 'Dados nao aceitos',
    message,
    { retry: apiFailure },
  )
  getElement('[data-cy="contract-result"]').textContent = message
  showToast(message, 'error')
  return message
}

function renderContractsTableState(message, state = 'empty') {
  getElement('[data-cy="contracts-table-body"]').innerHTML = `
    <tr class="table-state ${escapeHtml(state)}">
      <td colspan="6">${escapeHtml(message)}</td>
    </tr>
  `
}

function formatDateForInput(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

function formatDateForDisplay(value, fallback = 'Sem fim') {
  if (!value) return fallback
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Data invalida'
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date)
}

function formatCents(value) {
  return formatCurrency(Number(value || 0) / 100)
}

function renderContractClientOptions(selectedClientId = '') {
  const select = getElement('[data-field="contractClientId"]')
  const selected = String(selectedClientId || select.value || '')

  if (!contractClientsCache.length) {
    select.innerHTML = '<option value="">Cadastre um cliente antes</option>'
    return
  }

  select.innerHTML = [
    '<option value="">Selecione um cliente</option>',
    ...contractClientsCache.map((client) => {
      const isSelected = String(client.id) === selected ? ' selected' : ''
      const company = client.company ? ` - ${client.company}` : ''
      return `<option value="${escapeHtml(client.id)}"${isSelected}>${escapeHtml(client.name)}${escapeHtml(company)}</option>`
    }),
  ].join('')
}

async function loadContractClients(options = {}) {
  try {
    const { response, body } = await request('/api/clients')

    if (!response.ok) {
      contractClientsCache = []
      renderContractClientOptions()
      if (!options.silent) reportContractResponseError(response, body, 'Nao foi possivel carregar clientes.')
      return false
    }

    contractClientsCache = Array.isArray(body) ? body : body.data || []
    renderContractClientOptions(options.selectedClientId)
    return true
  } catch (error) {
    contractClientsCache = []
    renderContractClientOptions()
    if (!options.silent) {
      const message = 'API indisponivel para carregar clientes.'
      setContractsApiStatus('offline', 'Indisponivel')
      setContractFeedback('error', 'Sem clientes', message, { retry: true })
      getElement('[data-cy="contract-result"]').textContent = message
    }
    return false
  }
}

async function loadContracts(options = {}) {
  const query = getContractFilters()
  setContractsApiStatus('checking', 'Verificando')
  renderContractsTableState('Carregando contratos...', 'loading')
  if (!options.silent) {
    setContractFeedback('loading', 'Sincronizando dados', 'Consultando contratos, assinaturas e clientes na API.')
  }

  await loadContractClients({ silent: true })
  if (!editingContractId && !getElement('[data-field="contractStartDate"]').value) {
    getElement('[data-field="contractStartDate"]').value = getTodayInputValue()
  }

  try {
    const { response, body } = await request(`/api/contracts${query ? `?${query}` : ''}`)

    if (!response.ok) {
      contractsCache = []
      getElement('[data-cy="contracts-count"]').textContent = '0'
      const message = reportContractResponseError(response, body, 'Nao foi possivel carregar os contratos.')
      renderContractsTableState(message, 'error')
      return
    }

    contractsCache = Array.isArray(body) ? body : body.data || []
    renderContracts(contractsCache)
    setContractsApiStatus('online', 'API online')

    if (!options.silent) {
      const hasFilters = Boolean(query)
      setContractFeedback(
        contractsCache.length || !hasFilters ? 'success' : 'warning',
        contractsCache.length ? 'Base sincronizada' : hasFilters ? 'Nenhum resultado' : 'Base conectada',
        contractsCache.length
          ? `${contractsCache.length} contrato(s) carregado(s) do PostgreSQL.`
          : hasFilters
            ? 'Nenhum contrato corresponde aos filtros informados.'
            : 'A API esta online e ainda nao existem contratos cadastrados.',
      )
    }
  } catch (error) {
    contractsCache = []
    getElement('[data-cy="contracts-count"]').textContent = '0'
    const message = 'API indisponivel. Inicie a API e o Docker antes de consultar contratos.'
    renderContractsTableState(message, 'error')
    setContractsApiStatus('offline', 'Indisponivel')
    setContractFeedback('error', 'Sem conexao com a API', message, { retry: true })
    getElement('[data-cy="contract-result"]').textContent = message
  }
}

function renderContracts(contracts) {
  const table = getElement('[data-cy="contracts-table-body"]')
  getElement('[data-cy="contracts-count"]').textContent = String(contracts.length)

  if (!contracts.length) {
    renderContractsTableState('Nenhum contrato encontrado.')
    return
  }

  table.innerHTML = contracts
    .map((contract) => {
      const isActive = contract.status === 'active'
      const client = contract.client || {}
      return `
        <tr data-contract-row="${escapeHtml(contract.id)}" data-cy="contract-row-${escapeHtml(contract.id)}">
          <td>${escapeHtml(contract.id)}</td>
          <td>
            <strong>${escapeHtml(client.name || `Cliente #${contract.clientId}`)}</strong>
            <small>${escapeHtml(client.email || 'Sem e-mail')}</small>
          </td>
          <td>
            <strong>${escapeHtml(contract.title)}</strong>
            <small>${escapeHtml(contract.plan)} | ${escapeHtml(formatDateForDisplay(contract.startDate))} ate ${escapeHtml(formatDateForDisplay(contract.endDate))}</small>
          </td>
          <td>${escapeHtml(formatCents(contract.amountCents))}</td>
          <td><span class="status-badge ${escapeHtml(contract.status)}">${isActive ? 'Ativo' : 'Cancelado'}</span></td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-contract-action="edit" data-contract-id="${escapeHtml(contract.id)}" data-cy="contract-edit-${escapeHtml(contract.id)}" type="button">Editar</button>
              <button class="secondary-btn" data-contract-action="status" data-contract-id="${escapeHtml(contract.id)}" data-cy="contract-status-${escapeHtml(contract.id)}" type="button">${isActive ? 'Cancelar' : 'Ativar'}</button>
              <button class="danger-btn" data-contract-action="delete" data-contract-id="${escapeHtml(contract.id)}" data-cy="contract-delete-${escapeHtml(contract.id)}" type="button">Excluir</button>
            </div>
          </td>
        </tr>
      `
    })
    .join('')
}

function resetContractForm(options = {}) {
  const form = getElement('[data-form="contract"]')
  form.reset()
  clearFormErrors(form)
  editingContractId = null
  getElement('[data-field="contractId"]').value = ''
  getElement('[data-field="contractStartDate"]').value = getTodayInputValue()
  getElement('[data-cy="contract-form-title"]').textContent = 'Novo contrato'
  getElement('[data-cy="contract-submit"]').textContent = 'Cadastrar contrato'
  getElement('[data-cy="contract-cancel-edit"]').classList.add('hidden')
  renderContractClientOptions()
  if (!options.preserveResult) {
    getElement('[data-cy="contract-result"]').textContent = options.message || 'Selecione um cliente para iniciar.'
  }
}

async function startContractEdit(contractId, actionButton) {
  actionButton.disabled = true
  actionButton.textContent = 'Carregando...'
  setContractFeedback('loading', 'Carregando contrato', `Consultando o contrato #${contractId} pela API.`)

  try {
    const { response, body } = await request(`/api/contracts/${contractId}`)

    if (!response.ok) {
      reportContractResponseError(response, body, 'Nao foi possivel carregar o contrato para edicao.')
      return
    }

    const contract = body.data
    const cachedIndex = contractsCache.findIndex((item) => Number(item.id) === Number(contract.id))
    if (cachedIndex >= 0) contractsCache[cachedIndex] = contract

    await loadContractClients({ silent: true, selectedClientId: contract.clientId })

    editingContractId = contract.id
    getElement('[data-field="contractId"]').value = contract.id
    getElement('[data-field="contractClientId"]').value = contract.clientId
    getElement('[data-field="contractTitle"]').value = contract.title
    getElement('[data-field="contractPlan"]').value = contract.plan
    getElement('[data-field="contractAmountCents"]').value = contract.amountCents
    getElement('[data-field="contractStartDate"]').value = formatDateForInput(contract.startDate)
    getElement('[data-field="contractEndDate"]').value = formatDateForInput(contract.endDate)
    getElement('[data-field="contractStatus"]').value = contract.status
    getElement('[data-field="contractNotes"]').value = contract.notes || ''
    getElement('[data-cy="contract-form-title"]').textContent = `Editar contrato #${contract.id}`
    getElement('[data-cy="contract-submit"]').textContent = 'Salvar alteracoes'
    getElement('[data-cy="contract-cancel-edit"]').classList.remove('hidden')
    getElement('[data-cy="contract-result"]').textContent = `Editando contrato: ${contract.title}`
    setContractFeedback('success', 'Contrato carregado', `O contrato #${contract.id} esta pronto para edicao.`)
    getElement('[data-form="contract"]').scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (error) {
    const message = 'API indisponivel durante a consulta do contrato.'
    setContractsApiStatus('offline', 'Indisponivel')
    setContractFeedback('error', 'Falha ao abrir edicao', message, { retry: true })
    getElement('[data-cy="contract-result"]').textContent = message
    showToast(message, 'error')
  } finally {
    actionButton.disabled = false
    actionButton.textContent = 'Editar'
  }
}

getElement('[data-form="contract"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const requiredFields = [
    ['contractClientId', 'Cliente e obrigatorio'],
    ['contractTitle', 'Titulo e obrigatorio'],
    ['contractPlan', 'Plano e obrigatorio'],
    ['contractAmountCents', 'Valor e obrigatorio'],
    ['contractStartDate', 'Data de inicio e obrigatoria'],
  ]
  const valid = requiredFields.map(([field, message]) => requireField(field, message)).every(Boolean)
  const clientId = Number(getElement('[data-field="contractClientId"]').value)
  const amountCents = Number(getElement('[data-field="contractAmountCents"]').value)
  const startDate = getElement('[data-field="contractStartDate"]').value
  const endDate = getElement('[data-field="contractEndDate"]').value

  if (!Number.isInteger(clientId) || clientId <= 0) setError('contractClientId', 'Selecione um cliente valido')
  if (!Number.isInteger(amountCents) || amountCents <= 0) setError('contractAmountCents', 'Informe um valor inteiro positivo em centavos')
  if (endDate && startDate && new Date(endDate) < new Date(startDate)) setError('contractEndDate', 'Fim deve ser maior ou igual ao inicio')
  if (!valid || !Number.isInteger(clientId) || clientId <= 0 || !Number.isInteger(amountCents) || amountCents <= 0 || (endDate && startDate && new Date(endDate) < new Date(startDate))) {
    setContractFeedback('warning', 'Revise o formulario', 'Existem campos obrigatorios ou dados invalidos antes do envio.')
    getElement('[data-cy="contract-result"]').textContent = 'Corrija os campos destacados para continuar.'
    return
  }

  const payload = {
    clientId,
    title: getElement('[data-field="contractTitle"]').value.trim(),
    plan: getElement('[data-field="contractPlan"]').value.trim(),
    amountCents,
    startDate,
    endDate: endDate || null,
    status: getElement('[data-field="contractStatus"]').value,
    notes: getElement('[data-field="contractNotes"]').value.trim(),
  }
  const path = editingContractId ? `/api/contracts/${editingContractId}` : '/api/contracts'
  const method = editingContractId ? 'PUT' : 'POST'
  const wasEditing = Boolean(editingContractId)
  const submitButton = getElement('[data-cy="contract-submit"]')
  submitButton.disabled = true
  submitButton.textContent = wasEditing ? 'Salvando alteracoes...' : 'Cadastrando...'
  setContractFeedback('loading', wasEditing ? 'Atualizando contrato' : 'Cadastrando contrato', 'Enviando os dados para a API e o PostgreSQL.')

  try {
    const { response, body } = await request(path, { method, body: JSON.stringify(payload) })

    if (!response.ok) {
      reportContractResponseError(response, body, 'Nao foi possivel salvar o contrato.')
      return
    }

    const successMessage = wasEditing
      ? `Contrato atualizado com sucesso: ${body.data.title}`
      : `Contrato cadastrado com sucesso: ${body.data.title}`
    resetContractForm({ preserveResult: true })
    await loadContracts({ silent: true })
    getElement('[data-cy="contract-result"]').textContent = successMessage
    setContractFeedback('success', wasEditing ? 'Alteracoes salvas' : 'Contrato cadastrado', successMessage)
    showToast(wasEditing ? 'Contrato atualizado com sucesso' : 'Contrato cadastrado com sucesso')
  } catch (error) {
    const message = 'API indisponivel para salvar o contrato. Verifique os servicos e tente novamente.'
    setContractsApiStatus('offline', 'Indisponivel')
    setContractFeedback('error', 'Falha de conexao', message, { retry: true })
    getElement('[data-cy="contract-result"]').textContent = message
    showToast(message, 'error')
  } finally {
    submitButton.disabled = false
    submitButton.textContent = editingContractId ? 'Salvar alteracoes' : 'Cadastrar contrato'
  }
})

getElement('[data-cy="contract-cancel-edit"]').addEventListener('click', () => {
  resetContractForm({ message: 'Edicao cancelada. Nenhuma alteracao foi enviada.' })
  setContractFeedback('success', 'Edicao cancelada', 'O formulario voltou ao modo de cadastro.')
})

getElement('[data-cy="contracts-refresh"]').addEventListener('click', loadContracts)
getElement('[data-cy="contracts-retry"]').addEventListener('click', loadContracts)

getElement('[data-cy="contracts-clear-filters"]').addEventListener('click', () => {
  getElement('[data-cy="contracts-search"]').value = ''
  getElement('[data-cy="contracts-status-filter"]').value = ''
  loadContracts()
})

getElement('[data-cy="contracts-status-filter"]').addEventListener('change', loadContracts)

getElement('[data-cy="contracts-search"]').addEventListener('input', () => {
  clearTimeout(contractSearchTimer)
  contractSearchTimer = setTimeout(loadContracts, 280)
})

getElement('[data-cy="contracts-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-contract-action]')
  if (!button) return

  const contractId = Number(button.dataset.contractId)
  const contract = contractsCache.find((item) => Number(item.id) === contractId)
  if (!contract) return

  if (button.dataset.contractAction === 'edit') {
    await startContractEdit(contractId, button)
    return
  }

  if (button.dataset.contractAction === 'delete') {
    pendingDeleteContractId = contractId
    getElement('[data-cy="contract-delete-message"]').textContent = `Deseja realmente excluir o contrato ${contract.title}?`
    getElement('[data-cy="contract-delete-error"]').textContent = ''
    getElement('#contractDeleteModal').classList.remove('hidden')
    return
  }

  if (button.dataset.contractAction === 'status') {
    button.disabled = true
    const originalLabel = button.textContent
    button.textContent = 'Atualizando...'

    try {
      const willActivate = contract.status !== 'active'
      const action = willActivate ? 'activate' : 'cancel'
      const { response, body } = await request(`/api/contracts/${contractId}/${action}`, { method: 'PATCH' })

      if (!response.ok) {
        reportContractResponseError(response, body, 'Nao foi possivel atualizar o status.')
        return
      }

      await loadContracts({ silent: true })
      const message = `Contrato ${willActivate ? 'ativado' : 'cancelado'} com sucesso: ${contract.title}`
      getElement('[data-cy="contract-result"]').textContent = message
      setContractFeedback('success', 'Status atualizado', message)
      showToast(message)
    } catch (error) {
      const message = 'API indisponivel durante a atualizacao do status.'
      setContractsApiStatus('offline', 'Indisponivel')
      setContractFeedback('error', 'Falha de conexao', message, { retry: true })
      showToast(message, 'error')
    } finally {
      button.disabled = false
      button.textContent = originalLabel
    }
  }
})

getElement('[data-cy="contract-delete-cancel"]').addEventListener('click', () => {
  pendingDeleteContractId = null
  getElement('[data-cy="contract-delete-error"]').textContent = ''
  getElement('#contractDeleteModal').classList.add('hidden')
})

getElement('[data-cy="contract-delete-confirm"]').addEventListener('click', async () => {
  if (!pendingDeleteContractId) return
  const contractId = pendingDeleteContractId
  const confirmButton = getElement('[data-cy="contract-delete-confirm"]')
  confirmButton.disabled = true
  confirmButton.textContent = 'Excluindo...'
  getElement('[data-cy="contract-delete-error"]').textContent = ''

  try {
    const { response, body } = await request(`/api/contracts/${contractId}`, { method: 'DELETE' })

    if (!response.ok) {
      const message = reportContractResponseError(response, body, 'Nao foi possivel excluir o contrato.')
      getElement('[data-cy="contract-delete-error"]').textContent = message
      return
    }

    const message = `Contrato excluido com sucesso: ${body.data.title}`
    if (Number(editingContractId) === Number(contractId)) resetContractForm({ preserveResult: true })
    await loadContracts({ silent: true })
    getElement('[data-cy="contract-result"]').textContent = message
    setContractFeedback('success', 'Contrato excluido', message)
    showToast('Contrato excluido com sucesso')
    pendingDeleteContractId = null
    getElement('#contractDeleteModal').classList.add('hidden')
  } catch (error) {
    const message = 'API indisponivel durante a exclusao do contrato.'
    getElement('[data-cy="contract-delete-error"]').textContent = message
    setContractsApiStatus('offline', 'Indisponivel')
    setContractFeedback('error', 'Falha de conexao', message, { retry: true })
    showToast(message, 'error')
  } finally {
    confirmButton.disabled = false
    confirmButton.textContent = 'Confirmar exclusao'
  }
})

function setCommerceApiStatus(scope, state, label) {
  const badge = getElement(`[data-cy="${scope}-api-status"]`)
  if (!badge) return
  badge.dataset.state = state
  badge.textContent = label
}

function setCommerceFeedback(scope, state, title, message, options = {}) {
  const feedback = getElement(`[data-cy="${scope}-feedback"]`)
  if (!feedback) return
  feedback.dataset.state = state
  getElement(`[data-cy="${scope}-feedback-title"]`).textContent = title
  getElement(`[data-cy="${scope}-feedback-message"]`).textContent = message
  getElement(`[data-cy="${scope}-retry"]`)?.classList.toggle('hidden', !options.retry)
}

function getCommerceError(response, body, fallback) {
  if (response.status === 401) return 'Sessao ausente ou expirada. Faca login novamente.'
  if (response.status === 404) return body.error || 'Registro nao encontrado.'
  if (response.status >= 500) return body.error || 'Servico indisponivel.'
  return body.error || fallback
}

function renderCommerceState(selector, colspan, message, state = 'empty') {
  getElement(selector).innerHTML = `
    <tr class="table-state ${escapeHtml(state)}">
      <td colspan="${colspan}">${escapeHtml(message)}</td>
    </tr>
  `
}

function reportCommerceError(scope, response, body, fallback, resultSelector) {
  const message = getCommerceError(response, body, fallback)
  const apiFailure = response.status >= 500
  setCommerceApiStatus(scope, apiFailure ? 'offline' : 'online', apiFailure ? 'Falha' : 'API online')
  setCommerceFeedback(scope, apiFailure ? 'error' : 'warning', apiFailure ? 'Servico indisponivel' : 'Dados nao aceitos', message, { retry: apiFailure })
  if (resultSelector) getElement(resultSelector).textContent = message
  showToast(message, 'error')
  return message
}

function formatCommerceStatus(status) {
  const labels = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    processing: 'Processando',
    paid: 'Pago',
    canceled: 'Cancelado',
    approved: 'Aprovado',
    declined: 'Recusado',
    refunded: 'Estornado',
    expired: 'Expirado',
    archived: 'Arquivado',
  }
  return labels[status] || status
}

async function loadCommerceClients() {
  const { response, body } = await request('/api/clients')
  if (!response.ok) throw new Error(body.error || 'Clientes indisponiveis')
  commerceClientsCache = Array.isArray(body) ? body : body.data || []
  return commerceClientsCache
}

function renderClientOptions(selector, selectedId = '') {
  const select = getElement(selector)
  const selected = String(selectedId || select.value || '')
  if (!commerceClientsCache.length) {
    select.innerHTML = '<option value="">Cadastre um cliente antes</option>'
    return
  }
  select.innerHTML = [
    '<option value="">Selecione um cliente</option>',
    ...commerceClientsCache.map((client) => {
      const isSelected = String(client.id) === selected ? ' selected' : ''
      return `<option value="${escapeHtml(client.id)}"${isSelected}>${escapeHtml(client.name)}${client.company ? ` - ${escapeHtml(client.company)}` : ''}</option>`
    }),
  ].join('')
}

function renderProductOptions(selector, selectedId = '') {
  const select = getElement(selector)
  const selected = String(selectedId || select.value || '')
  const activeProducts = productsCache.filter((product) => product.status === 'active')
  if (!activeProducts.length) {
    select.innerHTML = '<option value="">Cadastre produto ativo antes</option>'
    return
  }
  select.innerHTML = [
    '<option value="">Selecione um produto</option>',
    ...activeProducts.map((product) => {
      const isSelected = String(product.id) === selected ? ' selected' : ''
      return `<option value="${escapeHtml(product.id)}"${isSelected}>${escapeHtml(product.name)} - ${escapeHtml(formatCents(product.priceCents))}</option>`
    }),
  ].join('')
}

function getProductFilters() {
  const search = getElement('[data-cy="products-search"]').value.trim()
  const status = getElement('[data-cy="products-status-filter"]').value
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (status) params.set('status', status)
  return params.toString()
}

async function loadProducts(options = {}) {
  const query = getProductFilters()
  setCommerceApiStatus('products', 'checking', 'Verificando')
  renderCommerceState('[data-cy="products-table-body"]', 6, 'Carregando produtos...', 'loading')
  if (!options.silent) setCommerceFeedback('products', 'loading', 'Sincronizando catalogo', 'Consultando produtos na API.')

  try {
    const { response, body } = await request(`/api/products${query ? `?${query}` : ''}`)
    if (!response.ok) {
      productsCache = []
      getElement('[data-cy="products-count"]').textContent = '0'
      const message = reportCommerceError('products', response, body, 'Nao foi possivel carregar produtos.', '[data-cy="product-result"]')
      renderCommerceState('[data-cy="products-table-body"]', 6, message, 'error')
      return
    }

    productsCache = Array.isArray(body) ? body : body.data || []
    renderProducts(productsCache)
    setCommerceApiStatus('products', 'online', 'API online')
    if (!options.silent) {
      setCommerceFeedback('products', 'success', 'Catalogo sincronizado', `${productsCache.length} produto(s) carregado(s).`)
    }
  } catch (error) {
    productsCache = []
    getElement('[data-cy="products-count"]').textContent = '0'
    const message = 'API indisponivel para produtos.'
    renderCommerceState('[data-cy="products-table-body"]', 6, message, 'error')
    setCommerceApiStatus('products', 'offline', 'Indisponivel')
    setCommerceFeedback('products', 'error', 'Falha de conexao', message, { retry: true })
  }
}

function renderProducts(products) {
  getElement('[data-cy="products-count"]').textContent = String(products.length)
  if (!products.length) {
    renderCommerceState('[data-cy="products-table-body"]', 6, 'Nenhum produto encontrado.')
    return
  }

  getElement('[data-cy="products-table-body"]').innerHTML = products
    .map(
      (product) => `
        <tr data-product-row="${escapeHtml(product.id)}">
          <td>${escapeHtml(product.id)}</td>
          <td><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.sku)}${product.description ? ` | ${escapeHtml(product.description)}` : ''}</small></td>
          <td>${escapeHtml(formatCents(product.priceCents))}</td>
          <td>${escapeHtml(product.stock)}</td>
          <td><span class="status-badge ${escapeHtml(product.status)}">${product.status === 'active' ? 'Ativo' : 'Inativo'}</span></td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-product-action="edit" data-product-id="${escapeHtml(product.id)}" type="button">Editar</button>
              <button class="secondary-btn" data-product-action="status" data-product-id="${escapeHtml(product.id)}" type="button">${product.status === 'active' ? 'Inativar' : 'Ativar'}</button>
              <button class="danger-btn" data-product-action="delete" data-product-id="${escapeHtml(product.id)}" type="button">Excluir</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('')
}

function resetProductForm(options = {}) {
  const form = getElement('[data-form="product"]')
  form.reset()
  clearFormErrors(form)
  editingProductId = null
  getElement('[data-field="productId"]').value = ''
  getElement('[data-cy="product-form-title"]').textContent = 'Novo produto'
  getElement('[data-cy="product-submit"]').textContent = 'Cadastrar produto'
  getElement('[data-cy="product-cancel-edit"]').classList.add('hidden')
  if (!options.preserveResult) getElement('[data-cy="product-result"]').textContent = options.message || 'Preencha os dados para iniciar.'
}

getElement('[data-form="product"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)
  const required = [
    ['productName', 'Nome e obrigatorio'],
    ['productSku', 'SKU e obrigatorio'],
    ['productPriceCents', 'Preco e obrigatorio'],
    ['productStock', 'Estoque e obrigatorio'],
  ]
  const valid = required.map(([field, message]) => requireField(field, message)).every(Boolean)
  const priceCents = Number(getElement('[data-field="productPriceCents"]').value)
  const stock = Number(getElement('[data-field="productStock"]').value)
  if (!Number.isInteger(priceCents) || priceCents <= 0) setError('productPriceCents', 'Informe preco positivo em centavos')
  if (!Number.isInteger(stock) || stock < 0) setError('productStock', 'Estoque nao pode ser negativo')
  if (!valid || !Number.isInteger(priceCents) || priceCents <= 0 || !Number.isInteger(stock) || stock < 0) return

  const payload = {
    name: getElement('[data-field="productName"]').value.trim(),
    sku: getElement('[data-field="productSku"]').value.trim(),
    description: getElement('[data-field="productDescription"]').value.trim(),
    priceCents,
    stock,
    status: getElement('[data-field="productStatus"]').value,
  }
  const path = editingProductId ? `/api/products/${editingProductId}` : '/api/products'
  const method = editingProductId ? 'PUT' : 'POST'
  const wasEditing = Boolean(editingProductId)
  const submitButton = getElement('[data-cy="product-submit"]')
  submitButton.disabled = true
  submitButton.textContent = wasEditing ? 'Salvando...' : 'Cadastrando...'

  try {
    const { response, body } = await request(path, { method, body: JSON.stringify(payload) })
    if (!response.ok) {
      reportCommerceError('products', response, body, 'Nao foi possivel salvar produto.', '[data-cy="product-result"]')
      return
    }
    const message = wasEditing ? `Produto atualizado: ${body.data.name}` : `Produto cadastrado: ${body.data.name}`
    resetProductForm({ preserveResult: true })
    await loadProducts({ silent: true })
    getElement('[data-cy="product-result"]').textContent = message
    setCommerceFeedback('products', 'success', wasEditing ? 'Produto atualizado' : 'Produto cadastrado', message)
    showToast(message)
  } catch (error) {
    const message = 'API indisponivel para salvar produto.'
    setCommerceApiStatus('products', 'offline', 'Indisponivel')
    setCommerceFeedback('products', 'error', 'Falha de conexao', message, { retry: true })
    showToast(message, 'error')
  } finally {
    submitButton.disabled = false
    submitButton.textContent = editingProductId ? 'Salvar alteracoes' : 'Cadastrar produto'
  }
})

getElement('[data-cy="products-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-product-action]')
  if (!button) return
  const productId = Number(button.dataset.productId)
  const product = productsCache.find((item) => Number(item.id) === productId)
  if (!product) return

  if (button.dataset.productAction === 'edit') {
    editingProductId = product.id
    getElement('[data-field="productId"]').value = product.id
    getElement('[data-field="productName"]').value = product.name
    getElement('[data-field="productSku"]').value = product.sku
    getElement('[data-field="productPriceCents"]').value = product.priceCents
    getElement('[data-field="productStock"]').value = product.stock
    getElement('[data-field="productStatus"]').value = product.status
    getElement('[data-field="productDescription"]').value = product.description || ''
    getElement('[data-cy="product-form-title"]').textContent = `Editar produto #${product.id}`
    getElement('[data-cy="product-submit"]').textContent = 'Salvar alteracoes'
    getElement('[data-cy="product-cancel-edit"]').classList.remove('hidden')
    getElement('[data-cy="product-result"]').textContent = `Editando produto: ${product.name}`
    getElement('[data-form="product"]').scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  if (button.dataset.productAction === 'status') {
    const status = product.status === 'active' ? 'inactive' : 'active'
    const { response, body } = await request(`/api/products/${productId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    if (!response.ok) {
      reportCommerceError('products', response, body, 'Nao foi possivel atualizar status.', '[data-cy="product-result"]')
      return
    }
    await loadProducts({ silent: true })
    showToast(`Produto ${status === 'active' ? 'ativado' : 'inativado'} com sucesso`)
    return
  }

  if (button.dataset.productAction === 'delete' && window.confirm(`Excluir produto ${product.name}?`)) {
    const { response, body } = await request(`/api/products/${productId}`, { method: 'DELETE' })
    if (!response.ok) {
      reportCommerceError('products', response, body, 'Nao foi possivel excluir produto.', '[data-cy="product-result"]')
      return
    }
    await loadProducts({ silent: true })
    showToast('Produto excluido com sucesso')
  }
})

getElement('[data-cy="product-cancel-edit"]').addEventListener('click', () => resetProductForm({ message: 'Edicao cancelada.' }))
getElement('[data-cy="products-refresh"]').addEventListener('click', loadProducts)
getElement('[data-cy="products-retry"]').addEventListener('click', loadProducts)
getElement('[data-cy="products-clear-filters"]').addEventListener('click', () => {
  getElement('[data-cy="products-search"]').value = ''
  getElement('[data-cy="products-status-filter"]').value = ''
  loadProducts()
})
getElement('[data-cy="products-status-filter"]').addEventListener('change', loadProducts)
getElement('[data-cy="products-search"]').addEventListener('input', () => {
  clearTimeout(productSearchTimer)
  productSearchTimer = setTimeout(loadProducts, 280)
})

async function setupCartView() {
  setCommerceApiStatus('cart', 'checking', 'Verificando')
  setCommerceFeedback('cart', 'loading', 'Carregando dados', 'Consultando clientes, produtos e carrinho.')
  try {
    await Promise.all([loadCommerceClients(), loadProducts({ silent: true })])
    renderClientOptions('[data-field="cartClientId"]')
    renderProductOptions('[data-field="cartProductId"]')
    await loadCart()
    setCommerceApiStatus('cart', 'online', 'API online')
  } catch (error) {
    setCommerceApiStatus('cart', 'offline', 'Indisponivel')
    setCommerceFeedback('cart', 'error', 'Falha de conexao', error.message, { retry: true })
    renderCommerceState('[data-cy="cart-table-body"]', 6, error.message, 'error')
  }
}

async function loadCart() {
  const clientId = getElement('[data-field="cartClientId"]').value || commerceClientsCache[0]?.id
  if (!clientId) {
    renderCommerceState('[data-cy="cart-table-body"]', 6, 'Selecione um cliente.')
    return
  }
  getElement('[data-field="cartClientId"]').value = clientId
  const { response, body } = await request(`/api/cart/${clientId}`)
  if (!response.ok) {
    const message = reportCommerceError('cart', response, body, 'Nao foi possivel carregar carrinho.', '[data-cy="cart-result"]')
    renderCommerceState('[data-cy="cart-table-body"]', 6, message, 'error')
    return
  }
  cartData = body.data
  renderCart(cartData)
  setCommerceFeedback('cart', 'success', 'Carrinho carregado', getCartSummary(cartData))
}

function getCartSummary(cart) {
  const listedItems = cart?.items?.length || 0
  const totalUnits = cart?.totalItems || 0
  const itemLabel = listedItems === 1 ? 'item na lista' : 'itens na lista'
  const unitLabel = totalUnits === 1 ? 'unidade' : 'unidades'

  return `${listedItems} ${itemLabel}, ${totalUnits} ${unitLabel}, subtotal ${formatCents(cart?.subtotalCents || 0)}.`
}

function renderCart(cart) {
  getElement('[data-cy="cart-subtotal"]').textContent = formatCents(cart?.subtotalCents || 0)
  if (!cart?.items?.length) {
    renderCommerceState('[data-cy="cart-table-body"]', 6, 'Carrinho vazio.')
    return
  }
  getElement('[data-cy="cart-table-body"]').innerHTML = cart.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.id)}</td>
          <td><strong>${escapeHtml(item.product.name)}</strong><small>${escapeHtml(item.product.sku)}</small></td>
          <td>${escapeHtml(item.quantity)}</td>
          <td>${escapeHtml(formatCents(item.unitPriceCents))}</td>
          <td>${escapeHtml(formatCents(item.subtotalCents))}</td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-cart-action="decrease" data-cart-item-id="${escapeHtml(item.id)}" type="button">-</button>
              <button class="secondary-btn" data-cart-action="increase" data-cart-item-id="${escapeHtml(item.id)}" type="button">+</button>
              <button class="danger-btn" data-cart-action="remove" data-cart-item-id="${escapeHtml(item.id)}" type="button">Remover</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('')
}

getElement('[data-form="cart"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  clearFormErrors(event.currentTarget)
  const clientId = Number(getElement('[data-field="cartClientId"]').value)
  const productId = Number(getElement('[data-field="cartProductId"]').value)
  const quantity = Number(getElement('[data-field="cartQuantity"]').value)
  if (!clientId) setError('cartClientId', 'Cliente e obrigatorio')
  if (!productId) setError('cartProductId', 'Produto e obrigatorio')
  if (!Number.isInteger(quantity) || quantity <= 0) setError('cartQuantity', 'Quantidade deve ser positiva')
  if (!clientId || !productId || !Number.isInteger(quantity) || quantity <= 0) return

  const { response, body } = await request('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ clientId, productId, quantity }),
  })
  if (!response.ok) {
    reportCommerceError('cart', response, body, 'Nao foi possivel adicionar item.', '[data-cy="cart-result"]')
    return
  }
  cartData = body.data
  renderCart(cartData)
  getElement('[data-cy="cart-result"]').textContent = 'Produto adicionado ao carrinho.'
  setCommerceFeedback('cart', 'success', 'Carrinho atualizado', getCartSummary(cartData))
})

getElement('[data-field="cartClientId"]').addEventListener('change', loadCart)
getElement('[data-cy="cart-retry"]').addEventListener('click', setupCartView)
getElement('[data-cy="cart-clear"]').addEventListener('click', async () => {
  const clientId = getElement('[data-field="cartClientId"]').value
  if (!clientId) return
  const { response, body } = await request(`/api/cart/${clientId}`, { method: 'DELETE' })
  if (!response.ok) {
    reportCommerceError('cart', response, body, 'Nao foi possivel limpar carrinho.', '[data-cy="cart-result"]')
    return
  }
  cartData = body.data
  renderCart(cartData)
  showToast('Carrinho limpo com sucesso')
})

getElement('[data-cy="cart-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-cart-action]')
  if (!button || !cartData) return
  const item = cartData.items.find((cartItem) => Number(cartItem.id) === Number(button.dataset.cartItemId))
  if (!item) return
  if (button.dataset.cartAction === 'remove') {
    const { response, body } = await request(`/api/cart/items/${item.id}`, { method: 'DELETE' })
    if (!response.ok) return reportCommerceError('cart', response, body, 'Nao foi possivel remover item.', '[data-cy="cart-result"]')
    cartData = body.data
    renderCart(cartData)
    return
  }
  const quantity = button.dataset.cartAction === 'increase' ? item.quantity + 1 : item.quantity - 1
  if (quantity <= 0) return
  const { response, body } = await request(`/api/cart/items/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  })
  if (!response.ok) return reportCommerceError('cart', response, body, 'Nao foi possivel atualizar quantidade.', '[data-cy="cart-result"]')
  cartData = body.data
  renderCart(cartData)
})

function getOrderFilters() {
  const search = getElement('[data-cy="orders-search"]').value.trim()
  const status = getElement('[data-cy="orders-status-filter"]').value
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (status) params.set('status', status)
  return params.toString()
}

async function setupOrdersView() {
  setCommerceApiStatus('orders', 'checking', 'Verificando')
  setCommerceFeedback('orders', 'loading', 'Sincronizando pedidos', 'Consultando clientes, produtos e pedidos.')
  try {
    await Promise.all([loadCommerceClients(), loadProducts({ silent: true })])
    renderClientOptions('[data-field="orderClientId"]')
    renderProductOptions('[data-field="orderProductId"]')
    renderOrderDraft()
    await loadOrders()
    setCommerceApiStatus('orders', 'online', 'API online')
  } catch (error) {
    setCommerceApiStatus('orders', 'offline', 'Indisponivel')
    setCommerceFeedback('orders', 'error', 'Falha de conexao', error.message, { retry: true })
  }
}

async function loadOrders(options = {}) {
  const query = getOrderFilters()
  renderCommerceState('[data-cy="orders-table-body"]', 6, 'Carregando pedidos...', 'loading')
  const { response, body } = await request(`/api/orders${query ? `?${query}` : ''}`)
  if (!response.ok) {
    const message = reportCommerceError('orders', response, body, 'Nao foi possivel carregar pedidos.', '[data-cy="order-result"]')
    renderCommerceState('[data-cy="orders-table-body"]', 6, message, 'error')
    return
  }
  ordersCache = Array.isArray(body) ? body : body.data || []
  renderOrders(ordersCache)
  if (!options.silent) setCommerceFeedback('orders', 'success', 'Pedidos sincronizados', `${ordersCache.length} pedido(s) carregado(s).`)
}

function renderOrderDraft() {
  const list = getElement('[data-cy="order-draft-items"]')
  if (!orderDraftItems.length) {
    list.innerHTML = '<li><span>Nenhum item adicionado</span></li>'
    return
  }
  list.innerHTML = orderDraftItems
    .map((item, index) => `<li><span>${escapeHtml(item.name)} x ${escapeHtml(item.quantity)}</span><button class="danger-btn" data-order-draft-remove="${index}" type="button">Remover</button></li>`)
    .join('')
}

function renderOrders(orders) {
  getElement('[data-cy="orders-count"]').textContent = String(orders.length)
  if (!orders.length) {
    renderCommerceState('[data-cy="orders-table-body"]', 6, 'Nenhum pedido encontrado.')
    return
  }
  getElement('[data-cy="orders-table-body"]').innerHTML = orders
    .map((order) => {
      const itemText = order.items.map((item) => `${item.productName} x ${item.quantity}`).join(', ')
      return `
        <tr>
          <td>${escapeHtml(order.id)}</td>
          <td><strong>${escapeHtml(order.client?.name || `Cliente #${order.clientId}`)}</strong><small>${escapeHtml(order.client?.email || '')}</small></td>
          <td>${escapeHtml(itemText)}</td>
          <td>${escapeHtml(formatCents(order.totalCents))}</td>
          <td><span class="status-badge ${escapeHtml(order.status)}">${escapeHtml(formatCommerceStatus(order.status))}</span></td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-order-action="processing" data-order-id="${escapeHtml(order.id)}" type="button">Processar</button>
              <button class="secondary-btn" data-order-action="paid" data-order-id="${escapeHtml(order.id)}" type="button">Pagar</button>
              <button class="danger-btn" data-order-action="cancel" data-order-id="${escapeHtml(order.id)}" type="button">Cancelar</button>
            </div>
          </td>
        </tr>
      `
    })
    .join('')
}

getElement('[data-cy="order-add-item"]').addEventListener('click', () => {
  const productId = Number(getElement('[data-field="orderProductId"]').value)
  const quantity = Number(getElement('[data-field="orderQuantity"]').value)
  const product = productsCache.find((item) => Number(item.id) === productId)
  clearFormErrors(getElement('[data-form="order"]'))
  if (!productId || !product) return setError('orderProductId', 'Produto e obrigatorio')
  if (!Number.isInteger(quantity) || quantity <= 0) return setError('orderQuantity', 'Quantidade deve ser positiva')
  const existingItem = orderDraftItems.find((item) => item.productId === productId)
  if (existingItem) existingItem.quantity += quantity
  else orderDraftItems.push({ productId, quantity, name: product.name })
  renderOrderDraft()
})

getElement('[data-cy="order-draft-items"]').addEventListener('click', (event) => {
  const button = event.target.closest('[data-order-draft-remove]')
  if (!button) return
  orderDraftItems.splice(Number(button.dataset.orderDraftRemove), 1)
  renderOrderDraft()
})

getElement('[data-form="order"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  const clientId = Number(getElement('[data-field="orderClientId"]').value)
  if (!clientId) return setError('orderClientId', 'Cliente e obrigatorio')
  if (!orderDraftItems.length) {
    getElement('[data-cy="order-result"]').textContent = 'Adicione ao menos um item.'
    return
  }
  const payload = {
    clientId,
    items: orderDraftItems.map(({ productId, quantity }) => ({ productId, quantity })),
    notes: getElement('[data-field="orderNotes"]').value.trim(),
  }
  const { response, body } = await request('/api/orders', { method: 'POST', body: JSON.stringify(payload) })
  if (!response.ok) return reportCommerceError('orders', response, body, 'Nao foi possivel criar pedido.', '[data-cy="order-result"]')
  orderDraftItems = []
  renderOrderDraft()
  await Promise.all([loadOrders({ silent: true }), loadProducts({ silent: true })])
  getElement('[data-cy="order-result"]').textContent = `Pedido criado: #${body.data.id}, total ${formatCents(body.data.totalCents)}`
  showToast('Pedido criado com sucesso')
})

getElement('[data-cy="orders-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-order-action]')
  if (!button) return
  const orderId = Number(button.dataset.orderId)
  const action = button.dataset.orderAction
  const path = action === 'cancel' ? `/api/orders/${orderId}/cancel` : `/api/orders/${orderId}/status`
  const body = action === 'cancel' ? undefined : JSON.stringify({ status: action })
  const { response, body: responseBody } = await request(path, { method: 'PATCH', ...(body ? { body } : {}) })
  if (!response.ok) return reportCommerceError('orders', response, responseBody, 'Nao foi possivel atualizar pedido.', '[data-cy="order-result"]')
  await loadOrders({ silent: true })
  showToast('Pedido atualizado com sucesso')
})

getElement('[data-cy="orders-refresh"]').addEventListener('click', loadOrders)
getElement('[data-cy="orders-retry"]').addEventListener('click', setupOrdersView)
getElement('[data-cy="orders-clear-filters"]').addEventListener('click', () => {
  getElement('[data-cy="orders-search"]').value = ''
  getElement('[data-cy="orders-status-filter"]').value = ''
  loadOrders()
})
getElement('[data-cy="orders-status-filter"]').addEventListener('change', loadOrders)
getElement('[data-cy="orders-search"]').addEventListener('input', () => {
  clearTimeout(orderSearchTimer)
  orderSearchTimer = setTimeout(loadOrders, 280)
})

function getPaymentFilters() {
  const method = getElement('[data-cy="payments-method-filter"]').value
  const status = getElement('[data-cy="payments-status-filter"]').value
  const params = new URLSearchParams()
  if (method) params.set('method', method)
  if (status) params.set('status', status)
  return params.toString()
}

async function setupPaymentsView() {
  setCommerceApiStatus('payments', 'checking', 'Verificando')
  setCommerceFeedback('payments', 'loading', 'Carregando pagamentos', 'Consultando pedidos e pagamentos.')
  try {
    await loadOrders({ silent: true })
    renderPaymentOrderOptions()
    await loadPayments()
    setCommerceApiStatus('payments', 'online', 'API online')
  } catch (error) {
    setCommerceApiStatus('payments', 'offline', 'Indisponivel')
    setCommerceFeedback('payments', 'error', 'Falha de conexao', error.message, { retry: true })
  }
}

function renderPaymentOrderOptions() {
  const select = getElement('[data-field="paymentOrderId"]')
  const payableOrders = ordersCache.filter((order) => order.status !== 'canceled')
  if (!payableOrders.length) {
    select.innerHTML = '<option value="">Crie um pedido antes</option>'
    return
  }
  select.innerHTML = [
    '<option value="">Selecione um pedido</option>',
    ...payableOrders.map((order) => `<option value="${escapeHtml(order.id)}">#${escapeHtml(order.id)} - ${escapeHtml(order.client?.name || 'Cliente')} - ${escapeHtml(formatCents(order.totalCents))}</option>`),
  ].join('')
}

async function loadPayments(options = {}) {
  const query = getPaymentFilters()
  renderCommerceState('[data-cy="payments-table-body"]', 6, 'Carregando pagamentos...', 'loading')
  const { response, body } = await request(`/api/payments${query ? `?${query}` : ''}`)
  if (!response.ok) {
    const message = reportCommerceError('payments', response, body, 'Nao foi possivel carregar pagamentos.', '[data-cy="payment-result"]')
    renderCommerceState('[data-cy="payments-table-body"]', 6, message, 'error')
    return
  }
  paymentsCache = Array.isArray(body) ? body : body.data || []
  renderPayments(paymentsCache)
  if (!options.silent) setCommerceFeedback('payments', 'success', 'Pagamentos sincronizados', `${paymentsCache.length} pagamento(s) carregado(s).`)
}

function renderPayments(payments) {
  getElement('[data-cy="payments-count"]').textContent = String(payments.length)
  if (!payments.length) {
    renderCommerceState('[data-cy="payments-table-body"]', 6, 'Nenhum pagamento encontrado.')
    return
  }
  getElement('[data-cy="payments-table-body"]').innerHTML = payments
    .map(
      (payment) => `
        <tr>
          <td>${escapeHtml(payment.id)}</td>
          <td><strong>#${escapeHtml(payment.orderId)}</strong><small>${escapeHtml(payment.order?.client?.name || '')}</small></td>
          <td>${escapeHtml(payment.method)}${payment.cardLast4 ? `<small>final ${escapeHtml(payment.cardLast4)}</small>` : ''}</td>
          <td>${escapeHtml(formatCents(payment.amountCents))}</td>
          <td><span class="status-badge ${escapeHtml(payment.status)}">${escapeHtml(formatCommerceStatus(payment.status))}</span></td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-payment-action="confirm" data-payment-id="${escapeHtml(payment.id)}" type="button">Confirmar</button>
              <button class="secondary-btn" data-payment-action="decline" data-payment-id="${escapeHtml(payment.id)}" type="button">Recusar</button>
              <button class="danger-btn" data-payment-action="refund" data-payment-id="${escapeHtml(payment.id)}" type="button">Estornar</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join('')
}

getElement('[data-form="payment"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  clearFormErrors(event.currentTarget)
  const orderId = Number(getElement('[data-field="paymentOrderId"]').value)
  const method = getElement('[data-field="paymentMethod"]').value
  const amountValue = getElement('[data-field="paymentAmountCents"]').value
  const cardNumber = getElement('[data-field="paymentCardNumber"]').value.trim()
  const expiresAt = getElement('[data-field="paymentExpiresAt"]').value
  if (!orderId) return setError('paymentOrderId', 'Pedido e obrigatorio')
  if (method === 'card' && !cardNumber) return setError('paymentCardNumber', 'Cartao e obrigatorio para metodo cartao')

  const payload = { orderId, method }
  if (amountValue) payload.amountCents = Number(amountValue)
  if (cardNumber) payload.cardNumber = cardNumber
  if (expiresAt) payload.expiresAt = expiresAt
  const { response, body } = await request('/api/payments', { method: 'POST', body: JSON.stringify(payload) })
  if (!response.ok) return reportCommerceError('payments', response, body, 'Nao foi possivel criar pagamento.', '[data-cy="payment-result"]')
  await loadPayments({ silent: true })
  getElement('[data-cy="payment-result"]').textContent = `Pagamento criado: #${body.data.id} (${body.data.method})`
  showToast('Pagamento criado com sucesso')
})

getElement('[data-cy="payments-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-payment-action]')
  if (!button) return
  const paymentId = Number(button.dataset.paymentId)
  const action = button.dataset.paymentAction
  const { response, body } = await request(`/api/payments/${paymentId}/${action}`, { method: 'PATCH' })
  if (!response.ok) return reportCommerceError('payments', response, body, 'Nao foi possivel atualizar pagamento.', '[data-cy="payment-result"]')
  await Promise.all([loadPayments({ silent: true }), loadOrders({ silent: true })])
  renderPaymentOrderOptions()
  showToast('Pagamento atualizado com sucesso')
})

getElement('[data-cy="payments-refresh"]').addEventListener('click', loadPayments)
getElement('[data-cy="payments-retry"]').addEventListener('click', setupPaymentsView)
getElement('[data-cy="payments-clear-filters"]').addEventListener('click', () => {
  getElement('[data-cy="payments-method-filter"]').value = ''
  getElement('[data-cy="payments-status-filter"]').value = ''
  loadPayments()
})
getElement('[data-cy="payments-method-filter"]').addEventListener('change', loadPayments)
getElement('[data-cy="payments-status-filter"]').addEventListener('change', loadPayments)

function formatCouponDiscount(coupon) {
  if (coupon.type === 'percentage') return `${coupon.value}%`
  return formatCents(coupon.value)
}

function toInputDateTime(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 16)
}

function getCouponFilters() {
  const search = getElement('[data-cy="coupons-search"]').value.trim()
  const status = getElement('[data-cy="coupons-status-filter"]').value
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (status) params.set('status', status)
  return params.toString()
}

async function setupCouponsView() {
  setCommerceApiStatus('coupons', 'checking', 'Verificando')
  setCommerceFeedback('coupons', 'loading', 'Carregando cupons', 'Consultando cupons e pedidos disponiveis.')
  try {
    await Promise.all([loadOrders({ silent: true }), loadCoupons({ silent: true })])
    renderCouponOrderOptions()
    setCommerceApiStatus('coupons', 'online', 'API online')
    setCommerceFeedback('coupons', 'success', 'Cupons sincronizados', `${couponsCache.length} cupom(ns) carregado(s).`)
  } catch (error) {
    setCommerceApiStatus('coupons', 'offline', 'Indisponivel')
    setCommerceFeedback('coupons', 'error', 'Falha de conexao', error.message, { retry: true })
  }
}

async function loadCoupons(options = {}) {
  const query = getCouponFilters()
  renderCommerceState('[data-cy="coupons-table-body"]', 7, 'Carregando cupons...', 'loading')
  const { response, body } = await request(`/api/coupons${query ? `?${query}` : ''}`)
  if (!response.ok) {
    const message = reportCommerceError('coupons', response, body, 'Nao foi possivel carregar cupons.', '[data-cy="coupon-result"]')
    renderCommerceState('[data-cy="coupons-table-body"]', 7, message, 'error')
    return
  }
  couponsCache = Array.isArray(body) ? body : body.data || []
  renderCoupons(couponsCache)
  if (!options.silent) setCommerceFeedback('coupons', 'success', 'Cupons sincronizados', `${couponsCache.length} cupom(ns) carregado(s).`)
}

function renderCouponOrderOptions() {
  const select = getElement('[data-field="couponOrderId"]')
  const orders = ordersCache.filter((order) => !['canceled', 'paid'].includes(order.status))
  if (!orders.length) {
    select.innerHTML = '<option value="">Crie um pedido pendente antes</option>'
    return
  }
  select.innerHTML = [
    '<option value="">Selecione um pedido</option>',
    ...orders.map((order) => `<option value="${escapeHtml(order.id)}">#${escapeHtml(order.id)} - ${escapeHtml(order.client?.name || 'Cliente')} - ${escapeHtml(formatCents(order.totalCents))}</option>`),
  ].join('')
}

function renderCoupons(coupons) {
  getElement('[data-cy="coupons-count"]').textContent = String(coupons.length)
  if (!coupons.length) {
    renderCommerceState('[data-cy="coupons-table-body"]', 7, 'Nenhum cupom encontrado.')
    return
  }
  getElement('[data-cy="coupons-table-body"]').innerHTML = coupons
    .map((coupon) => {
      const usageText = `${coupon.usedCount}${coupon.usageLimit ? `/${coupon.usageLimit}` : '/livre'}`
      const ruleText = `Min ${formatCents(coupon.minOrderCents || 0)}${coupon.maxDiscountCents ? ` | Max ${formatCents(coupon.maxDiscountCents)}` : ''}`
      return `
        <tr data-coupon-row="${escapeHtml(coupon.id)}">
          <td>${escapeHtml(coupon.id)}</td>
          <td><strong>${escapeHtml(coupon.code)}</strong><small>${escapeHtml(coupon.description || 'Sem descricao')}</small></td>
          <td>${escapeHtml(formatCouponDiscount(coupon))}</td>
          <td><small>${escapeHtml(ruleText)}</small></td>
          <td>${escapeHtml(usageText)}</td>
          <td><span class="status-badge ${escapeHtml(coupon.status)}">${escapeHtml(formatCommerceStatus(coupon.status))}</span></td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-coupon-action="edit" data-coupon-id="${escapeHtml(coupon.id)}" type="button">Editar</button>
              <button class="secondary-btn" data-coupon-action="expire" data-coupon-id="${escapeHtml(coupon.id)}" type="button">Expirar</button>
              <button class="danger-btn" data-coupon-action="delete" data-coupon-id="${escapeHtml(coupon.id)}" type="button">Excluir</button>
            </div>
          </td>
        </tr>
      `
    })
    .join('')
}

function resetCouponForm(options = {}) {
  const form = getElement('[data-form="coupon"]')
  form.reset()
  clearFormErrors(form)
  editingCouponId = null
  getElement('[data-field="couponId"]').value = ''
  getElement('[data-cy="coupon-form-title"]').textContent = 'Regra de desconto'
  getElement('[data-cy="coupon-submit"]').textContent = 'Cadastrar cupom'
  getElement('[data-cy="coupon-cancel-edit"]').classList.add('hidden')
  if (!options.preserveResult) getElement('[data-cy="coupon-result"]').textContent = options.message || 'Crie um cupom para testar validacao e aplicacao em pedidos.'
}

function getCouponPayload() {
  const payload = {
    code: getElement('[data-field="couponCode"]').value.trim(),
    type: getElement('[data-field="couponType"]').value,
    value: Number(getElement('[data-field="couponValue"]').value),
    minOrderCents: Number(getElement('[data-field="couponMinOrderCents"]').value || 0),
    status: getElement('[data-field="couponStatus"]').value,
    description: getElement('[data-field="couponDescription"]').value.trim(),
  }
  const maxDiscountCents = getElement('[data-field="couponMaxDiscountCents"]').value
  const usageLimit = getElement('[data-field="couponUsageLimit"]').value
  const startsAt = getElement('[data-field="couponStartsAt"]').value
  const expiresAt = getElement('[data-field="couponExpiresAt"]').value
  if (maxDiscountCents) payload.maxDiscountCents = Number(maxDiscountCents)
  if (usageLimit) payload.usageLimit = Number(usageLimit)
  if (startsAt) payload.startsAt = startsAt
  if (expiresAt) payload.expiresAt = expiresAt
  return payload
}

getElement('[data-form="coupon"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)
  const codeValid = requireField('couponCode', 'Codigo e obrigatorio')
  const valueValid = requireField('couponValue', 'Valor e obrigatorio')
  const value = Number(getElement('[data-field="couponValue"]').value)
  const minOrderCents = Number(getElement('[data-field="couponMinOrderCents"]').value || 0)
  if (!Number.isInteger(value) || value <= 0) setError('couponValue', 'Valor deve ser positivo')
  if (!Number.isInteger(minOrderCents) || minOrderCents < 0) setError('couponMinOrderCents', 'Pedido minimo nao pode ser negativo')
  if (!codeValid || !valueValid || !Number.isInteger(value) || value <= 0 || !Number.isInteger(minOrderCents) || minOrderCents < 0) return

  const path = editingCouponId ? `/api/coupons/${editingCouponId}` : '/api/coupons'
  const method = editingCouponId ? 'PUT' : 'POST'
  const wasEditing = Boolean(editingCouponId)
  const { response, body } = await request(path, { method, body: JSON.stringify(getCouponPayload()) })
  if (!response.ok) return reportCommerceError('coupons', response, body, 'Nao foi possivel salvar cupom.', '[data-cy="coupon-result"]')
  resetCouponForm({ preserveResult: true })
  await loadCoupons({ silent: true })
  const message = wasEditing ? `Cupom atualizado: ${body.data.code}` : `Cupom cadastrado: ${body.data.code}`
  getElement('[data-cy="coupon-result"]').textContent = message
  showToast(message)
})

getElement('[data-cy="coupons-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-coupon-action]')
  if (!button) return
  const couponId = Number(button.dataset.couponId)
  const coupon = couponsCache.find((item) => Number(item.id) === couponId)
  if (!coupon) return

  if (button.dataset.couponAction === 'edit') {
    editingCouponId = coupon.id
    getElement('[data-field="couponId"]').value = coupon.id
    getElement('[data-field="couponCode"]').value = coupon.code
    getElement('[data-field="couponType"]').value = coupon.type
    getElement('[data-field="couponValue"]').value = coupon.value
    getElement('[data-field="couponMinOrderCents"]').value = coupon.minOrderCents
    getElement('[data-field="couponMaxDiscountCents"]').value = coupon.maxDiscountCents || ''
    getElement('[data-field="couponUsageLimit"]').value = coupon.usageLimit || ''
    getElement('[data-field="couponStartsAt"]').value = toInputDateTime(coupon.startsAt)
    getElement('[data-field="couponExpiresAt"]').value = toInputDateTime(coupon.expiresAt)
    getElement('[data-field="couponStatus"]').value = coupon.status
    getElement('[data-field="couponDescription"]').value = coupon.description || ''
    getElement('[data-cy="coupon-form-title"]').textContent = `Editar cupom #${coupon.id}`
    getElement('[data-cy="coupon-submit"]').textContent = 'Salvar alteracoes'
    getElement('[data-cy="coupon-cancel-edit"]').classList.remove('hidden')
    getElement('[data-cy="coupon-result"]').textContent = `Editando cupom: ${coupon.code}`
    getElement('[data-form="coupon"]').scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  if (button.dataset.couponAction === 'expire') {
    const { response, body } = await request(`/api/coupons/${couponId}/expire`, { method: 'PATCH' })
    if (!response.ok) return reportCommerceError('coupons', response, body, 'Nao foi possivel expirar cupom.', '[data-cy="coupon-result"]')
    await loadCoupons({ silent: true })
    showToast('Cupom expirado com sucesso')
    return
  }

  if (button.dataset.couponAction === 'delete' && window.confirm(`Excluir cupom ${coupon.code}?`)) {
    const { response, body } = await request(`/api/coupons/${couponId}`, { method: 'DELETE' })
    if (!response.ok) return reportCommerceError('coupons', response, body, 'Nao foi possivel excluir cupom.', '[data-cy="coupon-result"]')
    await loadCoupons({ silent: true })
    showToast('Cupom excluido com sucesso')
  }
})

async function submitCouponValidation(apply = false) {
  clearFormErrors(getElement('[data-form="coupon-apply"]'))
  const orderId = Number(getElement('[data-field="couponOrderId"]').value)
  const code = getElement('[data-field="couponApplyCode"]').value.trim()
  if (!orderId) setError('couponOrderId', 'Pedido e obrigatorio')
  if (!code) setError('couponApplyCode', 'Codigo e obrigatorio')
  if (!orderId || !code) return

  const endpoint = apply ? '/api/coupons/apply' : '/api/coupons/validate'
  const { response, body } = await request(endpoint, { method: 'POST', body: JSON.stringify({ orderId, code }) })
  if (!response.ok) return reportCommerceError('coupons', response, body, 'Cupom nao aceito para este pedido.', '[data-cy="coupon-apply-result"]')
  const data = body.data
  getElement('[data-cy="coupon-apply-result"]').textContent = `${apply ? 'Aplicado' : 'Valido'}: ${data.coupon.code}, desconto ${formatCents(data.discountCents)}, total final ${formatCents(data.finalTotalCents)}.`
  await Promise.all([loadCoupons({ silent: true }), loadOrders({ silent: true })])
  renderCouponOrderOptions()
  showToast(apply ? 'Cupom aplicado com sucesso' : 'Cupom validado com sucesso')
}

getElement('[data-form="coupon-apply"]').addEventListener('submit', (event) => {
  event.preventDefault()
  submitCouponValidation(true)
})
getElement('[data-cy="coupon-validate"]').addEventListener('click', () => submitCouponValidation(false))
getElement('[data-cy="coupon-cancel-edit"]').addEventListener('click', () => resetCouponForm({ message: 'Edicao cancelada.' }))
getElement('[data-cy="coupons-refresh"]').addEventListener('click', loadCoupons)
getElement('[data-cy="coupons-retry"]').addEventListener('click', setupCouponsView)
getElement('[data-cy="coupons-clear-filters"]').addEventListener('click', () => {
  getElement('[data-cy="coupons-search"]').value = ''
  getElement('[data-cy="coupons-status-filter"]').value = ''
  loadCoupons()
})
getElement('[data-cy="coupons-status-filter"]').addEventListener('change', loadCoupons)
getElement('[data-cy="coupons-search"]').addEventListener('input', () => {
  clearTimeout(couponSearchTimer)
  couponSearchTimer = setTimeout(loadCoupons, 280)
})

function getEvidenceFilters() {
  const search = getElement('[data-cy="evidences-search"]').value.trim()
  const entityType = getElement('[data-cy="evidences-entity-filter"]').value
  const status = getElement('[data-cy="evidences-status-filter"]').value
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (entityType) params.set('entityType', entityType)
  if (status) params.set('status', status)
  return params.toString()
}

async function setupEvidencesView() {
  setCommerceApiStatus('evidences', 'checking', 'Verificando')
  setCommerceFeedback('evidences', 'loading', 'Carregando evidencias', 'Consultando clientes, pedidos e arquivos.')
  try {
    await Promise.all([loadCommerceClients(), loadOrders({ silent: true })])
    renderClientOptions('[data-field="evidenceClientId"]')
    renderEvidenceOrderOptions()
    await loadEvidences()
    setCommerceApiStatus('evidences', 'online', 'API online')
  } catch (error) {
    setCommerceApiStatus('evidences', 'offline', 'Indisponivel')
    setCommerceFeedback('evidences', 'error', 'Falha de conexao', error.message, { retry: true })
  }
}

function renderEvidenceOrderOptions() {
  const select = getElement('[data-field="evidenceOrderId"]')
  if (!ordersCache.length) {
    select.innerHTML = '<option value="">Crie um pedido antes</option>'
    return
  }
  select.innerHTML = [
    '<option value="">Selecione um pedido</option>',
    ...ordersCache.map((order) => `<option value="${escapeHtml(order.id)}">#${escapeHtml(order.id)} - ${escapeHtml(order.client?.name || 'Cliente')} - ${escapeHtml(formatCents(order.totalCents))}</option>`),
  ].join('')
}

async function loadEvidences(options = {}) {
  const query = getEvidenceFilters()
  renderCommerceState('[data-cy="evidences-table-body"]', 6, 'Carregando evidencias...', 'loading')
  const { response, body } = await request(`/api/evidences${query ? `?${query}` : ''}`)
  if (!response.ok) {
    const message = reportCommerceError('evidences', response, body, 'Nao foi possivel carregar evidencias.', '[data-cy="evidence-result"]')
    renderCommerceState('[data-cy="evidences-table-body"]', 6, message, 'error')
    return
  }
  evidencesCache = Array.isArray(body) ? body : body.data || []
  renderEvidences(evidencesCache)
  if (!options.silent) setCommerceFeedback('evidences', 'success', 'Evidencias sincronizadas', `${evidencesCache.length} evidencia(s) carregada(s).`)
}

function renderEvidences(evidences) {
  getElement('[data-cy="evidences-count"]').textContent = String(evidences.length)
  if (!evidences.length) {
    renderCommerceState('[data-cy="evidences-table-body"]', 6, 'Nenhuma evidencia encontrada.')
    return
  }
  getElement('[data-cy="evidences-table-body"]').innerHTML = evidences
    .map((evidence) => {
      const linkText = evidence.entityType === 'order' ? `Pedido #${evidence.orderId}` : `Cliente #${evidence.clientId}`
      return `
        <tr data-evidence-row="${escapeHtml(evidence.id)}">
          <td>${escapeHtml(evidence.id)}</td>
          <td><strong>${escapeHtml(evidence.title)}</strong><small>${escapeHtml(evidence.storageKey)}</small></td>
          <td>${escapeHtml(linkText)}</td>
          <td><strong>${escapeHtml(evidence.fileName)}</strong><small>${escapeHtml(evidence.mimeType)} | ${escapeHtml(formatEvidenceFileSize(evidence.sizeBytes))}</small></td>
          <td><span class="status-badge ${escapeHtml(evidence.status)}">${escapeHtml(formatCommerceStatus(evidence.status))}</span></td>
          <td>
            <div class="client-row-actions">
              <button class="secondary-btn" data-evidence-action="metadata" data-evidence-id="${escapeHtml(evidence.id)}" type="button">Metadata</button>
              <button class="danger-btn" data-evidence-action="delete" data-evidence-id="${escapeHtml(evidence.id)}" type="button">Excluir</button>
            </div>
          </td>
        </tr>
      `
    })
    .join('')
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(String(reader.result || '').split(',')[1] || ''))
    reader.addEventListener('error', () => reject(new Error('Nao foi possivel ler o arquivo.')))
    reader.readAsDataURL(file)
  })
}

function getEvidenceFileExtension(fileName = '') {
  const parts = fileName.toLowerCase().split('.')
  return parts.length > 1 ? parts.pop() : ''
}

function getEvidenceMimeType(file) {
  if (file.type) return file.type.toLowerCase()
  return EVIDENCE_EXTENSION_MIME_MAP[getEvidenceFileExtension(file.name)] || 'application/octet-stream'
}

function isEvidenceFileTypeAllowed(file) {
  return EVIDENCE_ALLOWED_MIME_TYPES.includes(getEvidenceMimeType(file))
}

function formatEvidenceFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} bytes`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function updateEvidenceFileSelection() {
  const input = getElement('[data-field="evidenceFile"]')
  const selected = getElement('[data-cy="evidence-file-selected"]')
  const file = input.files[0]

  if (!file) {
    selected.textContent = 'Nenhum arquivo selecionado.'
    return
  }

  const mimeType = getEvidenceMimeType(file)
  selected.textContent = `${file.name} | ${mimeType} | ${formatEvidenceFileSize(file.size)}`
  setError('evidenceFile', '')
  if (!isEvidenceFileTypeAllowed(file)) setError('evidenceFile', 'Tipo de arquivo nao permitido')
  if (file.size > EVIDENCE_MAX_FILE_SIZE) setError('evidenceFile', 'Arquivo deve ter ate 1MB')
}

getElement('[data-form="evidence"]').addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)
  const titleValid = requireField('evidenceTitle', 'Titulo e obrigatorio')
  const entityType = getElement('[data-field="evidenceEntityType"]').value
  const clientId = Number(getElement('[data-field="evidenceClientId"]').value)
  const orderId = Number(getElement('[data-field="evidenceOrderId"]').value)
  const file = getElement('[data-field="evidenceFile"]').files[0]
  const fileTypeAllowed = file ? isEvidenceFileTypeAllowed(file) : false
  if (entityType === 'client' && !clientId) setError('evidenceClientId', 'Cliente e obrigatorio')
  if (entityType === 'order' && !orderId) setError('evidenceOrderId', 'Pedido e obrigatorio')
  if (!file) setError('evidenceFile', 'Arquivo e obrigatorio')
  if (file && !fileTypeAllowed) setError('evidenceFile', 'Tipo de arquivo nao permitido')
  if (file && file.size > EVIDENCE_MAX_FILE_SIZE) setError('evidenceFile', 'Arquivo deve ter ate 1MB')
  if (!titleValid || !file || !fileTypeAllowed || file.size > EVIDENCE_MAX_FILE_SIZE || (entityType === 'client' && !clientId) || (entityType === 'order' && !orderId)) return

  try {
    const fileBase64 = await readFileAsBase64(file)
    const payload = {
      title: getElement('[data-field="evidenceTitle"]').value.trim(),
      entityType,
      clientId: clientId || undefined,
      orderId: orderId || undefined,
      status: getElement('[data-field="evidenceStatus"]').value,
      fileName: file.name,
      mimeType: getEvidenceMimeType(file),
      fileBase64,
      notes: getElement('[data-field="evidenceNotes"]').value.trim(),
    }
    const { response, body } = await request('/api/evidences', { method: 'POST', body: JSON.stringify(payload) })
    if (!response.ok) return reportCommerceError('evidences', response, body, 'Nao foi possivel enviar evidencia.', '[data-cy="evidence-result"]')
    form.reset()
    updateEvidenceFileSelection()
    renderClientOptions('[data-field="evidenceClientId"]')
    renderEvidenceOrderOptions()
    await loadEvidences({ silent: true })
    getElement('[data-cy="evidence-result"]').textContent = `Evidencia enviada: ${body.data.fileName} (${formatEvidenceFileSize(body.data.sizeBytes)}).`
    showToast('Evidencia enviada com sucesso')
  } catch (error) {
    const message = error.message || 'Falha ao processar arquivo.'
    getElement('[data-cy="evidence-result"]').textContent = message
    showToast(message, 'error')
  }
})

getElement('[data-cy="evidences-table-body"]').addEventListener('click', async (event) => {
  const button = event.target.closest('[data-evidence-action]')
  if (!button) return
  const evidenceId = Number(button.dataset.evidenceId)
  const evidence = evidencesCache.find((item) => Number(item.id) === evidenceId)
  if (!evidence) return

  if (button.dataset.evidenceAction === 'metadata') {
    const { response, body } = await request(`/api/evidences/${evidenceId}/download`)
    if (!response.ok) return reportCommerceError('evidences', response, body, 'Nao foi possivel baixar metadata.', '[data-cy="evidence-result"]')
    const metadata = {
      ...evidence,
      ...body.data,
    }
    getElement('[data-cy="evidence-metadata"]').value = JSON.stringify(metadata, null, 2)
    getElement('[data-cy="evidence-result"]').textContent = `Metadata carregada: ${body.data.fileName}`
    return
  }

  if (button.dataset.evidenceAction === 'delete' && window.confirm(`Excluir evidencia ${evidence.title}?`)) {
    const { response, body } = await request(`/api/evidences/${evidenceId}`, { method: 'DELETE' })
    if (!response.ok) return reportCommerceError('evidences', response, body, 'Nao foi possivel excluir evidencia.', '[data-cy="evidence-result"]')
    await loadEvidences({ silent: true })
    getElement('[data-cy="evidence-metadata"]').value = ''
    showToast('Evidencia excluida com sucesso')
  }
})

getElement('[data-cy="evidences-refresh"]').addEventListener('click', loadEvidences)
getElement('[data-cy="evidences-retry"]').addEventListener('click', setupEvidencesView)
getElement('[data-field="evidenceFile"]').addEventListener('change', updateEvidenceFileSelection)
getElement('[data-cy="evidences-clear-filters"]').addEventListener('click', () => {
  getElement('[data-cy="evidences-search"]').value = ''
  getElement('[data-cy="evidences-entity-filter"]').value = ''
  getElement('[data-cy="evidences-status-filter"]').value = ''
  loadEvidences()
})
getElement('[data-cy="evidences-search"]').addEventListener('input', () => {
  clearTimeout(evidenceSearchTimer)
  evidenceSearchTimer = setTimeout(loadEvidences, 280)
})
getElement('[data-cy="evidences-entity-filter"]').addEventListener('change', loadEvidences)
getElement('[data-cy="evidences-status-filter"]').addEventListener('change', loadEvidences)

document.querySelectorAll('.status-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.dataset.message
    const status = getElement('#visualStatus')
    status.textContent = message
    status.dataset.state = button.classList.contains('danger') ? 'error' : button.classList.contains('warning') ? 'warning' : 'success'
    showToast(message, status.dataset.state === 'error' ? 'error' : 'success')
  })
})

getElement('.upload-action').addEventListener('click', () => {
  const input = getElement('#uploadEvidence')
  const result = getElement('[data-role="uploadResult"]')

  if (!input.files.length) {
    setError('uploadEvidence', 'Selecione um arquivo')
    return
  }

  setError('uploadEvidence', '')
  result.textContent = `Arquivo enviado: ${input.files[0].name}`
  showToast('Evidência anexada com sucesso')
})

function renderDynamicTable() {
  const table = getElement('#dynamicTable')
  const filter = getElement('#tableFilter')?.value || 'Todos'
  const visibleRows = filter === 'Todos' ? tableRows : tableRows.filter((row) => row.status === filter)

  if (!visibleRows.length) {
    table.innerHTML = '<tr><td colspan="4">Nenhum cenário encontrado para este filtro</td></tr>'
    return
  }

  table.innerHTML = visibleRows
    .map(
      (row) => `
        <tr data-row-id="${row.id}">
          <td>${row.id}</td>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(row.status)}</td>
          <td><button class="secondary-btn" data-delete-row="${row.id}" type="button">Excluir</button></td>
        </tr>
      `,
    )
    .join('')
}

getElement('[data-cy="table-add"]').addEventListener('click', () => {
  const nameInput = getElement('#tableName')
  const name = nameInput.value.trim()

  if (!name) {
    showToast('Informe o nome do cenário', 'error')
    return
  }

  tableRows.push({
    id: Date.now(),
    name,
    status: getElement('#tableStatus').value,
  })

  nameInput.value = ''
  renderDynamicTable()
  showToast('Linha adicionada')
})

getElement('#tableFilter').addEventListener('change', renderDynamicTable)

getElement('#dynamicTable').addEventListener('click', (event) => {
  const deleteButton = event.target.closest('[data-delete-row]')
  if (!deleteButton) return

  const id = Number(deleteButton.dataset.deleteRow)
  tableRows = tableRows.filter((row) => row.id !== id)
  renderDynamicTable()
  showToast('Linha removida')
})

getElement('#scenarioRisk').addEventListener('input', updateScenarioRiskValue)

getElement('#scenarioStepInput').addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return
  event.preventDefault()
  addScenarioStep()
})

getElement('[data-action="add-step"]').addEventListener('click', addScenarioStep)

getElement('#scenarioSteps').addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-step]')
  if (!button) return

  scenarioSteps.splice(Number(button.dataset.removeStep), 1)
  renderScenarioSteps()
})

getElement('[data-action="preview-scenario"]').addEventListener('click', () => {
  const form = getElement('#scenarioBuilderForm')
  if (!validateScenarioBuilder(form)) return

  openScenarioPreview(getScenarioPayload())
})

getElement('#scenarioBuilderForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget
  if (!validateScenarioBuilder(form)) return

  const payload = getScenarioPayload()
  scenarioRows.unshift({
    ...payload,
    id: scenarioNextId,
  })
  scenarioNextId += 1
  resetScenarioBuilderForm(form)
  renderScenarioRows()
  showToast('Cenário salvo para automação')
})

getElement('#scenarioSearch').addEventListener('input', renderScenarioRows)

getElement('#scenarioRows').addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-scenario-action]')
  if (!actionButton) return

  const row = actionButton.closest('[data-scenario-id]')
  const id = Number(row.dataset.scenarioId)
  const scenario = scenarioRows.find((item) => item.id === id)
  if (!scenario) return

  if (actionButton.dataset.scenarioAction === 'delete') {
    scenarioRows = scenarioRows.filter((item) => item.id !== id)
    renderScenarioRows()
    showToast('Cenário removido da tabela')
    return
  }

  openScenarioPreview(scenario)
})

getElement('#hobbyStudioForm').addEventListener('input', updateHobbyPreview)

getElement('#hobbyStudioForm').addEventListener('change', (event) => {
  if (event.target.matches('#hobbyPoster')) {
    const fileName = event.target.files?.[0]?.name || 'Nenhum arquivo escolhido'
    getHobbyField('.hobby-file-name').textContent = fileName
  }

  updateHobbyPreview()
})

getElement('#hobbyStudioForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget

  if (!validateHobbyForm()) return

  const payload = getHobbyPayload()
  getHobbyField('.hobby-result').textContent = `Hobby cadastrado: ${payload.title} (${payload.type})`
  openHobbySuccess(payload)

  form.reset()
  getHobbyField('.hobby-file-name').textContent = 'Nenhum arquivo escolhido'
  updateHobbyPreview()
})

getElement('.settings-action').addEventListener('click', () => {
  const browser = getElement('#browserSelect').value
  const framework = getElement('input[name="framework"]:checked').value
  const environment = getElement('#settingsEnvironment').value
  const mode = getElement('#executionMode').value
  const viewport = getElement('#viewportSelect').value
  const retryCount = getElement('#retryCount').value
  const timeout = getElement('#timeoutSeconds').value
  const reporter = getElement('#reporterSelect').value
  const dataStrategy = getElement('#dataStrategy').value
  const enabledEvidence = [
    ['videoToggle', 'video'],
    ['screenshotToggle', 'screenshot em falha'],
    ['traceToggle', 'trace'],
    ['networkLogToggle', 'logs de rede'],
    ['accessibilityToggle', 'acessibilidade básica'],
    ['cleanupToggle', 'limpeza de massa'],
  ]
    .filter(([field]) => getElement(`#${field}`).checked)
    .map(([, label]) => label)

  getElement('[data-role="settingsResult"]').innerHTML = `
    <strong>${escapeHtml(framework)} configurado para ${escapeHtml(browser)}</strong>
    <span>Ambiente: ${escapeHtml(environment)} | Modo: ${escapeHtml(mode)} | Viewport: ${escapeHtml(viewport)}</span>
    <span>Retries: ${escapeHtml(retryCount)} | Timeout: ${escapeHtml(timeout)} | Relatório: ${escapeHtml(reporter)}</span>
    <span>Massa: ${escapeHtml(dataStrategy)} | Evidências: ${escapeHtml(enabledEvidence.join(', ') || 'nenhuma opção adicional')}</span>
  `
  showToast('Preferências salvas')
})

getElement('.terms-open-action').addEventListener('click', () => {
  openDialog('#termsConsentModal')
})

getElement('[data-cy="terms-consent-no"]').addEventListener('click', () => {
  closeDialog('#termsConsentModal')
})

getElement('[data-cy="terms-consent-yes"]').addEventListener('click', () => {
  closeDialog('#termsConsentModal')
  resetTermsSignature()
  openDialog('#termsSignatureModal')
})

getElement('[data-cy="terms-signature-cancel"]').addEventListener('click', () => {
  closeDialog('#termsSignatureModal')
})

getElement('[data-cy="terms-accept-check"]').addEventListener('change', () => {
  getElement('[data-cy="terms-error"]').textContent = ''
})

getElement('[data-cy="terms-finalize"]').addEventListener('click', () => {
  if (!getElement('[data-cy="terms-accept-check"]').checked) {
    getElement('[data-cy="terms-error"]').textContent = 'Marque o aceite para finalizar'
    return
  }

  closeDialog('#termsSignatureModal')
  openModal('Termos aceitos com sucesso.')
})

getElement('.api-check-action').addEventListener('click', async () => {
  const result = getElement('[data-role="apiResult"]')
  const baseUrl = getElement('#apiUrl').value.trim().replace(/\/$/, '')
  result.textContent = 'Verificando API...'
  const health = await checkApiHealth(baseUrl)
  applyApiAvailability(health)

  if (health.operational) {
    result.textContent = `API e PostgreSQL online. Status ${health.status}. Serviço: ${health.body.service}`
    showToast('API e banco verificados com sucesso')
    return
  }

  if (health.reached) {
    result.textContent = `API respondeu, mas o PostgreSQL está indisponível. Status ${health.status}.`
    showToast('Banco de dados indisponível', 'error')
    return
  }

  result.textContent = `API indisponível em ${baseUrl}`
  showToast('API indisponível para este teste', 'error')
})

getElement('#keyboardForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget
  clearFormErrors(form)

  const input = getElement('#keyboardName')
  const scenario = input.value.trim()

  if (!requireField('keyboardName', 'Informe o cenário')) return

  keyboardRows.push({
    id: keyboardNextId,
    name: scenario,
    createdAt: currentDate,
  })
  keyboardNextId += 1

  input.value = ''
  getElement('[data-role="keyboardResult"]').textContent = `Cenário salvo: ${scenario}`
  renderKeyboardScenarios()
  showToast('Cenário salvo por teclado')
})

function renderKeyboardScenarios() {
  const list = getElement('#keyboardHistory')
  const count = getElement('[data-role="keyboardCount"]')
  if (!list) return

  if (count) count.textContent = String(keyboardRows.length)

  if (!keyboardRows.length) {
    list.innerHTML = '<li class="keyboard-empty">Nenhum cenário salvo ainda.</li>'
    return
  }

  list.innerHTML = keyboardRows
    .map(
      (row, index) => `
        <li data-keyboard-row="${row.id}">
          <div>
            <strong>${String(index + 1).padStart(2, '0')} - ${escapeHtml(row.name)}</strong>
            <small>Entrada salva em ${escapeHtml(row.createdAt)}</small>
          </div>
          <button class="icon-btn" data-keyboard-delete="${row.id}" type="button" aria-label="Excluir cenário ${escapeHtml(row.name)}">
            <span class="delete-icon" aria-hidden="true"></span>
            <span class="sr-only">Excluir</span>
          </button>
        </li>
      `,
    )
    .join('')
}

getElement('#keyboardHistory').addEventListener('click', (event) => {
  const deleteButton = event.target.closest('[data-keyboard-delete]')
  if (!deleteButton) return

  const id = Number(deleteButton.dataset.keyboardDelete)
  const deleted = keyboardRows.find((row) => row.id === id)
  keyboardRows = keyboardRows.filter((row) => row.id !== id)
  renderKeyboardScenarios()

  if (deleted) {
    getElement('[data-role="keyboardResult"]').textContent = `Cenário excluído: ${deleted.name}`
    showToast('Cenário excluído da lista')
  }
})

getElement('[data-cy="modal-secondary"]').addEventListener('click', (event) => {
  const actionView = event.currentTarget.dataset.actionView
  closeModal()

  if (actionView) {
    showView(actionView)
  }
})

getElement('[data-cy="modal-close"]').addEventListener('click', async (event) => {
  const copyValue = event.currentTarget.dataset.copyValue

  if (copyValue) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível')
      await navigator.clipboard.writeText(copyValue)
      showToast('Token copiado para a área de transferência')
    } catch (error) {
      showToast('Token pronto para copiar')
    }
  }

  closeModal()
})

const REPORT_TYPES = {
  clients: {
    title: 'Relatório de clientes',
    statuses: [
      ['', 'Todos os status'],
      ['active', 'Ativos'],
      ['inactive', 'Inativos'],
    ],
    columns: ['ID', 'Nome', 'E-mail', 'Empresa', 'Status', 'Cadastro'],
    row: (item) => [item.id, item.name, item.email, item.company || '-', formatCommerceStatus(item.status), formatDateForDisplay(item.createdAt)],
  },
  orders: {
    title: 'Relatório de pedidos',
    statuses: [
      ['', 'Todos os status'],
      ['pending', 'Pendentes'],
      ['processing', 'Processando'],
      ['paid', 'Pagos'],
      ['canceled', 'Cancelados'],
    ],
    columns: ['ID', 'Cliente', 'Itens', 'Pagamentos', 'Total', 'Status', 'Cadastro'],
    row: (item) => [item.id, item.client?.name || '-', item._count?.items || 0, item._count?.payments || 0, formatCents(item.totalCents), formatCommerceStatus(item.status), formatDateForDisplay(item.createdAt)],
  },
  payments: {
    title: 'Relatório de pagamentos',
    statuses: [
      ['', 'Todos os status'],
      ['pending', 'Pendentes'],
      ['approved', 'Aprovados'],
      ['declined', 'Recusados'],
      ['refunded', 'Estornados'],
      ['expired', 'Expirados'],
    ],
    columns: ['ID', 'Pedido', 'Cliente', 'Método', 'Valor', 'Status', 'Cadastro'],
    row: (item) => [item.id, `#${item.orderId}`, item.order?.client?.name || '-', item.method, formatCents(item.amountCents), formatCommerceStatus(item.status), formatDateForDisplay(item.createdAt)],
  },
}

function setReportFeedback(state, title, message, options = {}) {
  const feedback = getElement('[data-cy="reports-feedback"]')
  feedback.dataset.state = state
  getElement('[data-cy="reports-feedback-title"]').textContent = title
  getElement('[data-cy="reports-feedback-message"]').textContent = message
  getElement('[data-cy="reports-retry"]').classList.toggle('hidden', !options.retry)
}

function setReportsApiStatus(state, label) {
  const badge = getElement('[data-cy="reports-api-status"]')
  badge.dataset.state = state
  badge.textContent = label
}

function updateReportStatusOptions() {
  const type = getElement('[data-cy="report-type"]').value
  const status = getElement('[data-cy="report-status"]')
  status.innerHTML = REPORT_TYPES[type].statuses.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('')
  getElement('[data-cy="report-title"]').textContent = REPORT_TYPES[type].title
}

function getReportQuery(includePagination = true) {
  const params = new URLSearchParams()
  const startDate = getElement('[data-cy="report-start-date"]').value
  const endDate = getElement('[data-cy="report-end-date"]').value
  const status = getElement('[data-cy="report-status"]').value
  if (startDate) params.set('startDate', startDate)
  if (endDate) params.set('endDate', endDate)
  if (status) params.set('status', status)
  if (includePagination) {
    params.set('page', String(reportCurrentPage))
    params.set('limit', getElement('[data-cy="report-limit"]').value)
  }
  return params.toString()
}

function renderReportRows(type, items) {
  const config = REPORT_TYPES[type]
  const head = getElement('[data-cy="report-table-head"]')
  const body = getElement('[data-cy="report-table-body"]')
  const empty = getElement('[data-cy="report-empty"]')
  const table = getElement('[data-cy="report-table"]')

  head.innerHTML = `<tr>${config.columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}</tr>`
  body.innerHTML = items.map((item) => `<tr>${config.row(item).map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`).join('')
  table.classList.toggle('hidden', items.length === 0)
  empty.classList.toggle('hidden', items.length > 0)
}

function renderReportPagination(pagination) {
  reportCurrentPage = pagination.page
  reportTotalPages = Math.max(1, pagination.totalPages)
  getElement('[data-cy="report-total"]').textContent = String(pagination.total)
  getElement('[data-cy="report-page-info"]').textContent = `Página ${reportCurrentPage} de ${reportTotalPages}`
  getElement('[data-cy="report-previous"]').disabled = reportCurrentPage <= 1
  getElement('[data-cy="report-next"]').disabled = reportCurrentPage >= reportTotalPages
}

async function loadReportSummary() {
  const { response, body } = await request('/api/reports/summary')
  if (!response.ok) throw new Error(getCommerceError(response, body, 'Não foi possível carregar os indicadores.'))
  const summary = body.data
  getElement('[data-cy="report-summary-clients"]').textContent = String(summary.clients)
  getElement('[data-cy="report-summary-active-clients"]').textContent = `${summary.activeClients} ativos`
  getElement('[data-cy="report-summary-orders"]').textContent = String(summary.orders)
  getElement('[data-cy="report-summary-paid-orders"]').textContent = `${summary.paidOrders} pagos`
  getElement('[data-cy="report-summary-payments"]').textContent = String(summary.payments)
  getElement('[data-cy="report-summary-approved-payments"]').textContent = `${summary.approvedPayments} aprovados`
  getElement('[data-cy="report-summary-revenue"]').textContent = formatCents(summary.approvedPaymentTotalCents)
}

async function loadReport(options = {}) {
  const type = getElement('[data-cy="report-type"]').value
  setReportFeedback('loading', 'Carregando relatório', 'Aplicando filtros e consultando a API.')
  setReportsApiStatus('checking', 'Consultando')

  try {
    const query = getReportQuery()
    const { response, body } = await request(`/api/reports/${type}?${query}`)
    if (!response.ok) throw new Error(getCommerceError(response, body, 'Não foi possível gerar o relatório.'))
    renderReportRows(type, body.data)
    renderReportPagination(body.pagination)
    if (!options.skipSummary) await loadReportSummary()
    setReportsApiStatus('online', 'API online')
    setReportFeedback('success', 'Relatório atualizado', `${body.pagination.total} registro(s) encontrado(s).`)
  } catch (error) {
    setReportsApiStatus('offline', 'Falha')
    setReportFeedback('error', 'Falha ao gerar relatório', error.message, { retry: true })
    showToast(error.message, 'error')
  }
}

async function exportReportCsv() {
  const type = getElement('[data-cy="report-type"]').value
  const token = localStorage.getItem('token') || ''
  const authorization = token.split('.').length === 3 ? `Bearer ${token}` : ''
  const button = getElement('[data-cy="report-export"]')
  button.disabled = true
  button.textContent = 'Exportando...'

  try {
    const response = await fetch(`${API_URL}/api/reports/${type}/export?${getReportQuery(false)}`, {
      headers: authorization ? { Authorization: authorization } : {},
    })
    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      throw new Error(getCommerceError(response, body, 'Não foi possível exportar o relatório.'))
    }

    const blob = await response.blob()
    const disposition = response.headers.get('content-disposition') || ''
    const fileName = disposition.match(/filename="?([^";]+)"?/i)?.[1] || `report-${type}.csv`
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(link.href)
    showToast('Relatório CSV exportado com sucesso')
  } catch (error) {
    setReportFeedback('error', 'Falha na exportação', error.message)
    showToast(error.message, 'error')
  } finally {
    button.disabled = false
    button.textContent = 'Exportar CSV'
  }
}

function setupReportsView() {
  updateReportStatusOptions()
  loadReport()
}

getElement('[data-cy="report-filters"]').addEventListener('submit', (event) => {
  event.preventDefault()
  reportCurrentPage = 1
  loadReport()
})

getElement('[data-cy="report-type"]').addEventListener('change', () => {
  reportCurrentPage = 1
  updateReportStatusOptions()
  loadReport()
})

getElement('[data-cy="report-limit"]').addEventListener('change', () => {
  reportCurrentPage = 1
  loadReport({ skipSummary: true })
})

getElement('[data-cy="report-clear"]').addEventListener('click', () => {
  getElement('[data-cy="report-start-date"]').value = ''
  getElement('[data-cy="report-end-date"]').value = ''
  getElement('[data-cy="report-status"]').value = ''
  getElement('[data-cy="report-limit"]').value = '10'
  reportCurrentPage = 1
  loadReport()
})

getElement('[data-cy="report-export"]').addEventListener('click', exportReportCsv)
getElement('[data-cy="reports-retry"]').addEventListener('click', () => loadReport())
getElement('[data-cy="report-previous"]').addEventListener('click', () => {
  if (reportCurrentPage <= 1) return
  reportCurrentPage -= 1
  loadReport({ skipSummary: true })
})
getElement('[data-cy="report-next"]').addEventListener('click', () => {
  if (reportCurrentPage >= reportTotalPages) return
  reportCurrentPage += 1
  loadReport({ skipSummary: true })
})

setupLoginAssistant()
setupPasswordToggles()
setupPhoneMasks()
setupDocumentMasks()
setupClientMasks()
populateCharacterYears()
showView(getRouteView(), { replaceRoute: true })
