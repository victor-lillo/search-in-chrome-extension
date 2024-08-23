const MAIN_FRAME = chrome.declarativeNetRequest.ResourceType.MAIN_FRAME
const SUB_FRAME = chrome.declarativeNetRequest.ResourceType.SUB_FRAME
const REDIRECT = chrome.declarativeNetRequest.RuleActionType.REDIRECT
const XMLHTTPREQUEST = chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST
const REDIRECT_BLOCKED_PAGE = chrome.runtime.getURL('/src/blocked/blocked.html')
const URL_PARAM_ORIGIN = 'origin'

export async function setBlockRules(domains: string[]) {
  // Remove previous rules
  await resetBlockRules()
  // Add new rules
  await addBlockRules(domains)
}

export async function addBlockRules(domains: string[]) {
  domains.forEach((domain: string, index: number) => {
    const id = index + 1

    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id,
          priority: 1,
          action: {
            type: REDIRECT,
            redirect: { regexSubstitution: REDIRECT_BLOCKED_PAGE + `?${URL_PARAM_ORIGIN}=\\0` },
          },
          condition: {
            requestDomains: [domain],
            regexFilter: '^.+$',
            resourceTypes: [MAIN_FRAME, SUB_FRAME, XMLHTTPREQUEST],
          },
        },
      ],
    })
  })
}

async function deleteRulesById(ids: number[]) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids,
  })
}

export async function resetBlockRules() {
  const totalIds = await getRulesIds()
  await deleteRulesById(totalIds)
}

export async function getRulesIds(): Promise<number[]> {
  const rules = await getRules()
  return rules.map(({ id }) => id)
}

export async function getRules() {
  return chrome.declarativeNetRequest.getDynamicRules()
}
