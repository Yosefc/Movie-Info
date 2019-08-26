import mockAxios from "axios";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { wait } from "@testing-library/dom";
import MovieDetails from "@/views/MovieDetails";
const localVue = createLocalVue();

describe("MovieDetails.vue", () => {
  it("mocks axios ", async done => {
    mockAxios.get.mockImplementationOnce(async _ => {
      const a = await Promise.resolve({
        data: {
          Title: "Guardians of the Galaxy Vol. 2",
          Released: "05 May 2017"
        }
      });
      return a;
    });
    const wrapper = await shallowMount(MovieDetails, {
      localVue,
      mocks: {
        $route: {
          params: {
            movieID: "tt3896198"
          }
        }
      }
    });
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith("/api/movie/movie_id=tt3896198");

    //Wait for component to fully load before executing tests.
    await wait();
    expect(wrapper.find(".title").text()).toBe("Guardians of the Galaxy Vol. 2");
    expect(wrapper.vm.movieDetails.Released).toBe("05 May 2017");
    done();
  });
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
});
