import { BaseModel } from 'src/db/base-model'

export class Organization extends BaseModel {
  static tableName = 'organization'

  name: string
}

type Bla = { name: string }

class Test implements Bla {
  name: string

  getName() {
    return this.name
  }
}


type NonFunctionsProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]


type Properties = NonFunctionsProperties<InstanceType<typeof Organization>>

type test = Omit<Properties, '$modelClass' | 'QueryBuilderType'>