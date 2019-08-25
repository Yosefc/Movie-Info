import { shallowMount } from "@vue/test-utils";
import Navbar from "@/components/Navbar";
import App from "vue";
import router from "@/router";

App.use(router);

describe("NavBar.vue", () => {
  it("renders the navbar", () => {
    const wrapper = shallowMount(Navbar);
    expect(wrapper.text()).toMatch("Movie-Info");
  });

  it("should render links", () => {
    const wrapper = shallowMount(Navbar);
    expect(wrapper.text()).toMatch("Home");
    expect(wrapper.text()).toMatch("About");
  });

  it("should test if search box is visable", () => {
    const wrapper = shallowMount(Navbar);
    expect(wrapper.find("#search-box").isVisible()).toBe(true);
  });
});
