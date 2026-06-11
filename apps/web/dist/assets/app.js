const API_URL = 'http://localhost:3030'
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
  forgotView: '/admin/recuperar-senha',
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
let currentSessionMode = 'local'
let tableRows = [
  { id: 1, name: 'Login com sucesso', status: 'Automatizado' },
  { id: 2, name: 'Formulário obrigatório', status: 'Planejado' },
  { id: 3, name: 'Validação de modal', status: 'Revisão' },
]

let keyboardRows = []
let keyboardNextId = 1
let scenarioRows = []
let scenarioSteps = []
let scenarioNextId = 1
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
    ? `O usuário '${userName || email}' foi salvo na massa local e já está disponível para login.`
    : String(userOrMessage || 'Este e-mail já está cadastrado na base local. Informe outro e-mail para continuar.')

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
  openModal('Token local gerado com sucesso. Use este código para simular a próxima etapa da recuperação de senha.', {
    title: 'Recuperação pronta',
    context: 'recovery',
    icon: 'QA',
    closeLabel: 'Copiar token',
    copyValue: token,
    items: [
      { label: 'E-mail validado', value: email },
      { label: 'Token local', value: token },
      { label: 'Validade', value: '10 minutos' },
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
    renderFeaturePagination()
  }

  if (viewId === 'usersView') {
    loadUsers()
  }

  if (viewId === 'tableView') {
    renderDynamicTable()
  }

  if (viewId === 'keyboardView') {
    renderKeyboardScenarios()
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
  getElement('[data-cy="metric-api-port"]').textContent = currentSessionMode === 'api' ? getApiPort() : 'Indisponível'
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
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const body = await response.json().catch(() => ({}))
  return { response, body }
}

function completeLogin(user, mode) {
  currentSessionMode = mode
  localStorage.setItem('token', mode === 'api' ? 'api-session' : 'local-session')
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

  const registeredLocalUser = findLocalUserByEmail(email)
  if (registeredLocalUser && getLocalUserPassword(registeredLocalUser) !== password) {
    setError('loginPassword', 'Senha incorreta')
    return
  }

  const localUser = registeredLocalUser || findLocalUser(email, password)
  if (localUser) {
    completeLogin(localUser, 'local')
    showToast('Login local realizado com sucesso')
    return
  }

  try {
    const { response, body } = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const authData = body.data || {}
      const apiUser = authData.user || authData
      completeLogin({ name: apiUser.name, email: apiUser.email || email }, 'api')
      showToast('Login realizado com sucesso pela API')
      return
    }

    const loginError = body.error || EMAIL_NOT_FOUND_ERROR
    if (/senha|password/i.test(loginError)) {
      setError('loginPassword', 'Senha incorreta')
      return
    }

    setError('loginEmail', loginError)
  } catch (error) {
    setError('loginEmail', EMAIL_NOT_FOUND_ERROR)
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

  if (!hasRegisteredEmail(email)) {
    setError('forgotEmail', EMAIL_NOT_FOUND_ERROR)
    return
  }

  const showLocalToken = () => {
    openRecoveryTokenModal(email, generateRecoveryToken())
  }

  try {
    const { response, body } = await request('/api/password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      showLocalToken()
      return
    }

    showLocalToken()
  } catch (error) {
    showLocalToken()
  }
})

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
  const priority = getElement('input[name="priority"]:checked')
  const selectedChannels = Array.from(document.querySelectorAll('input[name="channels"]:checked')).map((item) => item.value)
  const termsValid = requireChecked('contactTerms', 'Voce precisa aceitar os termos')

  if (email && !isEmail(email)) {
    setError('contactEmail', EMAIL_ERROR)
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
      (user, index) => {
        const isAdmin = ADMIN_EMAILS.includes(String(user.email || '').toLowerCase())

        return `
        <tr>
          <td>${index + 1}</td>
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

getElement('[data-cy="users-table"]').addEventListener('click', (event) => {
  const deleteButton = event.target.closest('[data-delete-user]')
  if (!deleteButton || deleteButton.disabled) return

  const result = deleteLocalUser(deleteButton.dataset.deleteUser)
  const resultText = getElement('[data-cy="users-result"]')

  if (result.error) {
    resultText.textContent = result.error
    showToast(result.error, 'error')
    return
  }

  resultText.textContent = `Usuário excluído com sucesso: ${result.user.email}`
  renderUsers(getLocalUsers())
  showToast('Usuário excluído com sucesso')
})

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

  try {
    const response = await fetch(baseUrl)
    const body = await response.json().catch(() => ({}))
    result.textContent = `API online. Status ${response.status}. Mensagem: ${body.message || 'sem mensagem'}`
    showToast('API verificada com sucesso')
  } catch (error) {
    result.textContent = `API indisponível em ${baseUrl}`
    showToast('API indisponível para este teste', 'error')
  }
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

setupLoginAssistant()
setupPasswordToggles()
populateCharacterYears()
showView(getRouteView(), { replaceRoute: true })
