import { atom } from 'recoil'

export const PanelsAtom = atom({
  key: 'IFt2sI40g55p6rl7EXAEI', // unique ID (with respect to other atoms/selectors)
  default: {
    active: 'templates',
    open: false
  }
})
