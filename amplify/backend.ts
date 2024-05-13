import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myFirstFunction } from './my-first-function/resources'

defineBackend({
  auth,
  data,
  myFirstFunction,
});
