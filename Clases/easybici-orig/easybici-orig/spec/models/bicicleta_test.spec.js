const Bicicleta = require('../../models/bicicleta')

beforeEach( () => {
    Bicicleta.allBicis = []
})

describe('Bicicleta.allBicis', () => {
    it('comienza vacía', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
    })
})

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
        let bici = new Bicicleta(1, 'rojo', 'bmx', [19.284770943610578, -99.13729060406136])
        Bicicleta.add(bici)
        expect(Bicicleta.allBicis.length).toBe(1)
        expect(Bicicleta.allBicis[0]).toBe(bici)
    })
})

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id=1', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
        let bici = new Bicicleta(1, 'rojo', 'bmx', [19.284770943610578, -99.13729060406136])
        let bici2 = new Bicicleta(2, 'verde', 'ruta', [19.45, -99.18])
        Bicicleta.add(bici)
        Bicicleta.add(bici2)
        
        let targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(1)
        expect(targetBici.color).toBe(bici.color)
        expect(targetBici.modelo).toBe(bici.modelo)

    }) 
})

describe('Bicicleta.removeById', () => {
    it('debe eliminar la bici con id=1', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
        let bici = new Bicicleta(1, 'rojo', 'bmx', [19.28, -99.13])
        Bicicleta.add(bici)
        Bicicleta.removeById(1)
        expect(Bicicleta.allBicis.length).toBe(0)
    }) 
})

