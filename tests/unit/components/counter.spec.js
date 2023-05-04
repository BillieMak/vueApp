import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {
    test('Debe hacer un match con el snapshot', () => {

        const wrapper = shallowMount(Counter)

        expect(wrapper.html()).toMatchSnapshot()
    })
 })