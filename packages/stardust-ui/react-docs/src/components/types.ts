import * as React from 'react'

export type KnobDefinition = {
  content?: React.ReactNode
  name: KnobName
  type: 'boolean' | 'number' | 'range' | 'string' | 'select'
  value: any
  values?: any[]
}

export type KnobName = string

export type KnobSet = Record<KnobName, KnobDefinition>

export type KnobComponent<P = KnobComponentProps> = React.FunctionComponent<P>

export type KnobComponentProps = KnobDefinition & {
  setValue: (value: any) => void
}

export type KnobRangeKnobComponentProps = KnobComponentProps & {
  min: string
  max: string
  step: string
  unit: string
}

export type LogFormatter<T extends any[] = any[]> = (name: string, ...args: T) => string

export type UseKnobOptions<T> = {
  content?: React.ReactNode
  name: string
  initialValue?: T
  values?: T[]
}
