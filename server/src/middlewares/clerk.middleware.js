import { clerkMiddleware  } from '@clerk/express'
import app from '../app.js'

app.use(clerkMiddleware())