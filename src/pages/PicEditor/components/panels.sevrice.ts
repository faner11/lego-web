import type { fabric } from 'fabric'
import { atom } from 'recoil'

export const PanelsAtom = atom({
  key: 'IFt2sI40g55p6rl7EXAEI', // unique ID (with respect to other atoms/selectors)
  default: {
    active: 'templates',
    open: false
  }
})

export const FabricAtom = atom<fabric.Canvas | null>({
  key: 'dhchly7QfVPizvu2aE5yN', // unique ID (with respect to other atoms/selectors)
  default: undefined,
  dangerouslyAllowMutability: true
})
