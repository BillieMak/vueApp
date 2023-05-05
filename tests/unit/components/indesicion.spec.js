import { shallowMount } from "@vue/test-utils";
import Indesicion from "@/components/Indesicion";

describe("Indesicion Component", () => {
  let wrapper;
  let clgSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indesicion);
    clgSpy = jest.spyOn(console, "log");

    jest.clearAllMocks();
  });

  test("Debe hacer un match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("escribir en el input no debe de disparar nada (console.log)", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    // console.log(wrapper.vm.$data);

    const input = wrapper.find("input");
    await input.setValue("Hola Mundo");

    expect(clgSpy).toHaveBeenCalledTimes(1);

    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('escribir el simbolo de "?" debe disparar el getAnswer', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    const input = wrapper.find("input");
    await input.setValue("Hola Mundo?");

    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("pruebas en getAnswer", async () => {
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.img).toBe("https://yesno.wtf/assets/yes/2.gif");
    expect(wrapper.vm.answer).toBe("yes");
  });

  test("pruebas en getAnswer - fallo en el API", async () => {

    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await wrapper.vm.getAnswer();

    const img = wrapper.find("img");    
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe("No se pudo cargar la respuesta 🥺");

  });
});
