import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { SUPPORT_LANG } from '../../constants'
import Tab from './tab'
import Editor from './editor'

function Step2() {
  const initialLang = SUPPORT_LANG.REDIS_CLI
  const [name, nameSet] = useState(initialLang.name)
  const [language, languageSet] = useState(initialLang.language)

  const onChange = (name, language) => {
    nameSet(name)
    languageSet(language)
  }

  return (
    <Box w="full" maxW={800} mx="auto">
      <Tab name={name} onChange={onChange} />

      <Box mt={4} p={6} bg="whiteAlpha.200" borderRadius="xl">
        <Editor name={name} language={language} />
      </Box>
    </Box>
  )
}

export default Step2
