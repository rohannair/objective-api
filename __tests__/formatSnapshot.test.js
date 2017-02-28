import { formatSnapshot } from '../app/utils/graphql_helpers'

describe('the formatSnapshot helper function', () => {

  let bodyJsonNotNull
  let bodyJsonNull

  beforeEach(() => {
    bodyJsonNotNull = {
      id: 24,
      name: 'test name',
      body: 'test body',
      blocker: false,
      completed: false,
      createdAt: '2017-02-22T19:12:50.975Z',
      img: 'some image',
      companyId: '4b12f283-223e-4d96-b4ba-8429ed74dafc',
      objectiveId: '8c5ede0f-4a24-458f-b2d8-73c6d2391e33',
      userId: 'b2aec89b-e83a-4bff-8caf-bebca78074e6',
      bodyJson: { blocks: {}, entityMap: {} }
    }

    bodyJsonNull = {
      id: 24,
      name: 'test name',
      body: 'test body',
      blocker: false,
      completed: false,
      createdAt: '2017-02-22T19:12:50.975Z',
      img: null,
      companyId: '4b12f283-223e-4d96-b4ba-8429ed74dafc',
      objectiveId: '8c5ede0f-4a24-458f-b2d8-73c6d2391e33',
      userId: 'b2aec89b-e83a-4bff-8caf-bebca78074e6',
      bodyJson: null
    }
  })

  test('should not mutate the args', () => {
    formatSnapshot(bodyJsonNotNull)
    expect(bodyJsonNotNull).toBe(bodyJsonNotNull)
  })

  test('should return a value other than undefined or null', () => {
    const output = formatSnapshot(bodyJsonNotNull)
    expect(output).toEqual(expect.anything())
  })

  describe('the returned value of formatSnapshot', () => {

    test('should be an object and not an array', () => {
      const output = formatSnapshot(bodyJsonNotNull)
      const objectCheck = !Array.isArray(output) && typeof(output) === 'object'
      expect(objectCheck).toBe(true)
    })

    test('should have the same keys as the inputted object', () => {
      const objectsHaveSameKeys = (...objects) => {
        const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), [])
        const union = new Set(allKeys)
        return objects.every(object => union.size === Object.keys(object).length)
      }
      const input = bodyJsonNotNull
      const output = formatSnapshot(bodyJsonNotNull)
      expect(objectsHaveSameKeys(input, output)).toBe(true)
    })

    test('should have the same key value pairs as the inputted object, key bodyJson excepted', () => {
      const output = formatSnapshot(bodyJsonNotNull)
      const input = bodyJsonNotNull
      delete input.bodyJson
      delete output.bodyJson
      expect(output).toEqual(input)
    })

    describe('the value of its bodyJson key', () => {

      test('should be stringified if the value of bodyJson from inputed object was not null', () => {
        const stringified = JSON.stringify(bodyJsonNotNull.bodyJson)
        expect(formatSnapshot(bodyJsonNotNull).bodyJson).toBe(stringified)
      })

      test('should remain null if the value of bodyJson from inputed object was null', () => {
        expect(formatSnapshot(bodyJsonNull).bodyJson).toBeNull()
      })
    })
  })
})
