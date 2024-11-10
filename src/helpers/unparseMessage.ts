// Module imports
import { type ChatMessage } from '@skyware/bot'





export function unparseMessage(message: ChatMessage) {
  let result = message.text

  if (message.facets) {
    const stringArray = Array.from(result)

    message.facets
      .filter(facet => {
        return facet.features.some(feature => feature.$type === 'app.bsky.richtext.facet#link')
      })
      .sort((facetA, facetB) => {
        if (facetA.byteIndex.byteStart > facetB.byteIndex.byteStart) {
          return -1
        }

        if (facetA.byteIndex.byteStart < facetB.byteIndex.byteStart) {
          return 1
        }

        return 0
      })
      .forEach(facet => {
        const link = facet.features
          .find(feature => feature.isLink())!
          .uri
        stringArray.splice(facet.byteIndex.byteStart, facet.byteIndex.byteEnd - facet.byteIndex.byteStart, link)
      })

    result = stringArray.join('')
  }

  return result
}
