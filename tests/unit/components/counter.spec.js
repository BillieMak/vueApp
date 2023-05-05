import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe("Counter Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  // test('Debe hacer un match con el snapshot', () => {

  //     const wrapper = shallowMount(Counter)

  //     expect(wrapper.html()).toMatchSnapshot()
  // })

  test('h2 debe tener el valor por defecto "Counter Custom"', () => {
    expect(wrapper.find("h2").exists()).toBeTruthy();

    const h2Value = wrapper.find("h2").text();

    expect(h2Value).toBe("Counter Custom");
  });

  test("el valor por defecto debe ser 4 en el p ", () => {
    expect(wrapper.findAll("p").length).toBe(2);

    // const pValue = wrapper.findAll("p")[1].text();

    const pValue = wrapper.find('[data-testid="counter"]').text();

    expect(pValue).toBe("4");
  });

  test("debe incrementar  y decrementar el contador", async () => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll("button");

    await increaseBtn.trigger("click");

    // expect(pValue).toBe('5')

    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");

    const pValue = wrapper.find('[data-testid="counter"]').text();

    expect(pValue).toBe("3");
  });

  test("debe establecer el valor por defecto", () => {
    const { start } = wrapper.props();

    const value = wrapper.find('[data-testid="counter"]').text();

    expect(Number(value)).toBe(start);
  });

  test("debe de mostrar la prop title", () => {
    const title = "Hola mundo";

    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });

    expect(wrapper.find("h2").text()).toBe(title);
  });
});
