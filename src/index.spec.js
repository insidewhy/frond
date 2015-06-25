import { first, none } from './index'
require('chai').should()
require('source-map-support').install()

describe('frond', () => {
  class Class {
    constructor() { this.extra = 4 }

    add(...vals) {
      return this.extra + vals.length + (vals.length > 0 ? vals[0] : 0)
    }
  }

  describe('first', () => {
    it('forwards only first argument', () => {
      first((...args) => { args.should.eql([1]) })(1,2,3)
    })

    it('forwards first argument with bound arguments', () => {
      first((...args) => { args.should.eql([1, 2, 3]) }, 1, 2)(3, 4, 5)
    })

    it('forwards to function bound to object', () => {
      var obj = new Class
      first(obj, 'add')(10, 11, 12).should.equal(15)
    })
  })

  describe('none', () => {
    it('forwards no arguments', () => {
      none((...args) => { args.should.eql([]) })(1,2,3)
    })

    it('forwards only bound arguments', () => {
      none((...args) => { args.should.eql([1, 2]) }, 1, 2)(3, 4, 5)
    })

    it('forwards no arguments to function bound to object', () => {
      var obj = new Class
      none(obj, 'add')(10, 11, 12).should.equal(4)
    })
  })
})
