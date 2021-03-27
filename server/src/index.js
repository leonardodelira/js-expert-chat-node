import SockerServer from './socket.js'
import Event from 'events'
import Controller from './controller.js'
import { constants } from './constansts.js'

const eventEmitter = new Event()

const port = process.env.PORT || 9898
const socketServer = new SockerServer({ port })
const server = await socketServer.initialize(eventEmitter)
console.log(`socker server is running at`, server.address().port)
const controller = new Controller({ socketServer })

eventEmitter.on(
  constants.event.NEW_USER_CONNECTED,
  controller.onNewConnection.bind(controller)
)