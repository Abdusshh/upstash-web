import { Button, Wrap, WrapItem } from '@chakra-ui/react'
import { SUPPORT_LANG } from '../../constants'

function TabButton({ selectedName, name, language, onChange, children }) {
  return (
    <Button
      size="sm"
      colorScheme={selectedName === name ? 'purple' : null}
      variant={selectedName === name ? 'solid' : 'outline'}
      onClick={() => onChange(name, language)}
    >
      {children}
    </Button>
  )
}

export default function Tab({ name, onChange }) {
  return (
    <Wrap spacing={2} justify="center">
      {Object.keys(SUPPORT_LANG).map((lang) => {
        const SELECTED_LANG = SUPPORT_LANG[lang]
        return (
          <WrapItem>
            <TabButton
              selectedName={name}
              name={SELECTED_LANG.name}
              language={SELECTED_LANG.language}
              onChange={onChange}
            >
              {SELECTED_LANG.name}
            </TabButton>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
