import { EventEmitter } from 'node:events'
import { IdGenerator } from '@cucumber/messages'
import Runtime, { IRuntime } from '../runtime'
import { EventDataCollector } from '../formatter/helpers'
import { ISupportCodeLibrary } from '../support_code_library_builder/types'
import Coordinator from '../runtime/parallel/coordinator'
import { ILogger } from '../logger'
import { IRunOptionsRuntime } from './types'

export function makeRuntime({
  cwd,
  logger,
  eventBroadcaster,
  eventDataCollector,
  pickleIds,
  newId,
  supportCodeLibrary,
  requireModules,
  requirePaths,
  importPaths,
  options: { parallel, ...options },
}: {
  cwd: string
  logger: ILogger
  eventBroadcaster: EventEmitter
  eventDataCollector: EventDataCollector
  newId: IdGenerator.NewId
  pickleIds: string[]
  supportCodeLibrary: ISupportCodeLibrary
  requireModules: string[]
  requirePaths: string[]
  importPaths: string[]
  options: IRunOptionsRuntime
}): IRuntime {
  if (parallel > 0) {
    return new Coordinator({
      cwd,
      logger,
      eventBroadcaster,
      eventDataCollector,
      pickleIds,
      options,
      newId,
      supportCodeLibrary,
      requireModules,
      requirePaths,
      importPaths,
      numberOfWorkers: parallel,
    })
  }
  return new Runtime({
    eventBroadcaster,
    eventDataCollector,
    newId,
    pickleIds,
    supportCodeLibrary,
    options,
  })
}
