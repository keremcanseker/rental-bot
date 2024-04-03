"use client";
import LogoutButton from "@/components/logoutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  CheckboxItem,
  DropdownMenuCheckboxItemProps,
} from "@radix-ui/react-dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, Euro } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import * as States from "./filtertypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { set } from "zod";
import { getUserIdFromCurrentSession } from "@/lib/auth";
import { get } from "http";
import { getUrls } from "@/lib/db";

type Checked = DropdownMenuCheckboxItemProps["checked"];
export default function Filters() {
  const [link, setLink] = useState<string>("");
  const [returnedData, setReturnedData] = useState<any>([]); //
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [buyOrRent, setBuyOrRent] = useState<"Buy" | "Rent">("Buy");
  const [startPrice, setStartPrice] = useState<number>(0);
  const [endPrice, setEndPrice] = useState<number>(0);
  const [livingAreaSizeStart, setLivingAreaSizeStart] = useState<number>(0);
  const [livingAreaSizeEnd, setLivingAreaSizeEnd] = useState<number>(0);
  const [plotAreaSizeStart, setPlotAreaSizeStart] = useState<number>(0);
  const [plotAreaSizeEnd, setPlotAreaSizeEnd] = useState<number>(0);
  const [numberofRoomsStart, setNumberofRoomsStart] = useState<number>(0);
  const [numberofRoomsEnd, setNumberofRoomsEnd] = useState<number>(0);
  const [numberOfBedroomsStart, setNumberOfBedroomsStart] = useState<number>(0);
  const [numberOfBedroomsEnd, setNumberOfBedroomsEnd] = useState<number>(0);
  const [gardenSurfaceStart, setGardenSurfaceStart] = useState<number>(0);
  const [gardenSurfaceEnd, setGardenSurfaceEnd] = useState<number>(0);

  const [garageCapacityStart, setGarageCapacityStart] = useState<number>(0);
  const [garageCapacityEnd, setGarageCapacityEnd] = useState<number>(0);
  const [gardenLocation, setgardenLocation] = useState(
    States.initialGardenLocationState
  );
  const [outdoorSpace, setOutdoorSpace] = useState(
    States.initialOutdoorSpaceState
  );

  const [garage, setGarage] = useState(States.initialGarageState);

  const [energyLabel, setEnergyLabel] = useState(States.initialEnegyLabelState);

  const [constructionType, setConstructionType] = useState(
    States.initialConstructionTypeState
  );

  const [locationState, setLocationState] = useState(
    States.initialLocationState
  );
  const [typeOfHouse, setTypeOfHouse] = useState(
    States.initialTypeOfHouseState
  );

  const [offeredSince, setOfferedSince] = useState(
    States.initialOfferedSinceState
  );
  const [available, setAvailable] = useState(States.initialAvailableState);

  const [properties, setProperties] = useState(States.initialPropertiesState);

  const [constructionPeriod, setConstructionPeriod] = useState(
    States.constructionPeriodState
  );
  const [sendedUrls, setSendedUrls] = useState([]);

  async function generateLink() {
    console.log("Generating link");
    const baseUrl = "https://www.funda.nl/zoeken/";
    console.log(locationState);
    let queryParams: string[] = [];

    //1-> buy or rent
    buyOrRent === "Buy" ? queryParams.push("koop?") : queryParams.push("huur?");

    //2-> find the selected type of house object_type=["house","apartment","buildingPlot","storageSpace","storage","berth","bottom","pitch"]
    const selectedTypeOfHouse = Object.keys(typeOfHouse).filter(
      (key) => typeOfHouse[key as keyof typeof typeOfHouse]
    );
    if (selectedTypeOfHouse.length > 0) {
      queryParams.push(`object_type=["${selectedTypeOfHouse.join('","')}"]`);
    }

    //3- price range
    if (startPrice > 0 && endPrice > 0) {
      queryParams.push(`price="${startPrice}-${endPrice}"`);
    }

    // 4-> Offered since
    const selectedOfferedSince = Object.keys(offeredSince).find(
      (key) => offeredSince[key as keyof typeof offeredSince]
    );
    if (selectedOfferedSince) {
      queryParams.push(
        `publication_date="${
          selectedOfferedSince === "last24Hours"
            ? "1"
            : selectedOfferedSince === "last3Days"
            ? "3"
            : selectedOfferedSince === "last5Days"
            ? "5"
            : selectedOfferedSince === "last10Days"
            ? "10"
            : selectedOfferedSince === "last30Days"
            ? "30"
            : ""
        }"`
      );
    }

    //5-> Availability
    // find the selected available state available=["available","sold","underOffer"]
    // find the selected availability state availability=["available","negotiations","unavailable"]
    const selectedAvailability = Object.keys(available).filter(
      (key) => available[key as keyof typeof available]
    );

    if (selectedAvailability.length > 0) {
      queryParams.push(`availability=["${selectedAvailability.join('","')}"]`);
    }

    //6-> Living area size
    // living area size floor_area=["100-200"]
    if (livingAreaSizeStart > 0 && livingAreaSizeEnd > 0) {
      queryParams.push(
        `floor_area="${livingAreaSizeStart}-${livingAreaSizeEnd}"`
      );
    }

    //7-> Plot area size
    if (plotAreaSizeStart > 0 && plotAreaSizeEnd > 0) {
      queryParams.push(`plot_area="${plotAreaSizeStart}-${plotAreaSizeEnd}"`);
    }

    //8-> Number of rooms
    if (numberofRoomsStart > 0 && numberofRoomsEnd > 0) {
      queryParams.push(`rooms="${numberofRoomsStart}-${numberofRoomsEnd}"`);
    }

    // 9-> number of bedrooms
    if (numberOfBedroomsStart > 0 && numberOfBedroomsEnd > 0) {
      queryParams.push(
        `bedrooms="${numberOfBedroomsStart}-${numberOfBedroomsEnd}"`
      );
    }

    // 10-> Energy Label
    const selectedEnergyLabel = Object.keys(energyLabel).filter(
      (key) => energyLabel[key as keyof typeof energyLabel]
    );
    if (selectedEnergyLabel.length > 0) {
      queryParams.push(`energy_label=["${selectedEnergyLabel.join('","')}"]`);
    }

    // 11-> Outdoor Space
    const selectedOutdoorSpace = Object.keys(outdoorSpace).filter(
      (key) => outdoorSpace[key as keyof typeof outdoorSpace]
    );
    if (selectedOutdoorSpace.length > 0) {
      queryParams.push(
        `exterior_space_type=["${selectedOutdoorSpace.join('","')}"]`
      );
    }

    // 12-> Garden Location
    //garden location exterior_space_garden_orientation=["south","west","east"]
    const selectedGardenLocation = Object.keys(gardenLocation).filter(
      (key) => gardenLocation[key as keyof typeof gardenLocation]
    );
    if (selectedGardenLocation.length > 0) {
      queryParams.push(
        `exterior_space_garden_orientation=["${selectedGardenLocation.join(
          '","'
        )}"]`
      );
    }

    // 13-> Garage garden surface
    if (gardenSurfaceStart > 0 && gardenSurfaceEnd > 0) {
      queryParams.push(
        `exterior_space_garden_size="${gardenSurfaceStart}-${gardenSurfaceEnd}"`
      );
    }

    //14-> Type of coonstruction
    // Find the selected construction type state construction_type=["resale","newly_built"]
    const selectedConstructionTypes = Object.keys(constructionType).filter(
      (key) => constructionType[key as keyof typeof constructionType]
    );

    // Map the selected options to their corresponding values
    const mappedConstructionTypes = selectedConstructionTypes.map((key) => {
      if (key === "newConstruction") return "newly_built";
      if (key === "existingConstruction") return "resale";
    });

    if (mappedConstructionTypes.length > 0) {
      queryParams.push(
        `construction_type=["${mappedConstructionTypes.join('","')}"]`
      );
    }

    // 15-> Construction period
    // Construction period construction_period=["from_1931_to_1944","from_1906_to_1930"]
    const selectedConstructionPeriods = Object.keys(constructionPeriod).filter(
      (key) => constructionPeriod[key as keyof typeof constructionPeriod]
    );

    if (selectedConstructionPeriods.length > 0) {
      const periodMappings: Record<
        keyof States.ConstructionPeriodState,
        string[]
      > = {
        unknown: ["unknown"],
        before1906: ["before_1906"],
        between1906And1930: ["from_1906_to_1930"],
        between1931And1944: ["from_1931_to_1944"],
        between1945And1959: ["from_1945_to_1959"],
        between1960And1970: ["from_1960_to_1970"],
        between1971And1980: ["from_1971_to_1980"],
        between1981And1990: ["from_1981_to_1990"],
        between1991And2000: ["from_1991_to_2000"],
        between2001And2010: ["from_2001_to_2010"],
        between2011And2020: ["from_2011_to_2020"],
        after2020: ["after_2020"],
      };

      const selectedPeriods = selectedConstructionPeriods.map(
        (period) => periodMappings[period as keyof typeof periodMappings]
      );
      queryParams.push(
        `construction_period=["${selectedPeriods.join('","')}"]`
      );
    }

    //16-> Surroundings/locations surrounding=["in_green_area","in_residential_district"]
    const locationMappings = {
      inResidentialArea: "in_green_area",
      inTheCenter: "in_residential_district",
      onAQuietRoad: "on_quiet_road",
      inWoodedArea: "in_wooded_area",
      openLocation: "open_location",
      outsideBuiltUpArea: "outside_built_up_area",
      ruralLocation: "rural_location",
      shelteredLocation: "sheltered_location",
      unobstructedView: "unobstructed_view",
      onTheEdgeOfTheForest: "on_edge_of_forest",
      onWater: "on_water",
      onBusyRoad: "on_busy_road",
      onWaterways: "on_waterways",
      atPark: "at_park",
    };

    // Filter selected locations and map them using the locationMappings
    const selectedLocations = Object.keys(locationState)
      .filter((key) => locationState[key as keyof typeof locationState])
      .map((key) => locationMappings[key as keyof typeof locationMappings]);

    // Construct the query parameter string
    if (selectedLocations.length > 0) {
      queryParams.push(`surrounding=["${selectedLocations.join('","')}"]`);
    }

    //17-> Garage
    const garageTypeMappings = {
      parkingBasement: "basement",
      indoorGarage: "indoor_garage",
      builtInGarage: "built_in",
      detachedGarage: "detached",
      garageBox: "garage_box",
      basement: "basement",
      garageCarport: "garage_and_carport",
    };

    // Filter selected garage types and map them using the garageTypeMappings
    const selectedGarageTypes = Object.keys(garage)
      .filter((key) => garage[key as keyof typeof garage])
      .map((key) => garageTypeMappings[key as keyof typeof garageTypeMappings]);

    // Construct the query parameter string
    if (selectedGarageTypes.length > 0) {
      queryParams.push(`garage_type=["${selectedGarageTypes.join('","')}"]`);
    }

    //18-> Properties
    // Mapping object to translate keys into their desired representations
    const amenitiesMappings = {
      centralHeatingBoiler: "central_heating_boiler",
      bathingSittingPool: "bathing_sitting_pool",
      renewableEnergy: "renewable_energy",
      fireplace: "fireplace",
      doubleOccupancy: "double_occupancy",
      swimmingPool: "swimming_pool",
      jobHouse: "job_house",
    };

    // Filter selected amenities and map them using the amenitiesMappings
    const selectedAmenities = Object.keys(properties)
      .filter((key) => properties[key as keyof typeof properties])
      .map((key) => amenitiesMappings[key as keyof typeof amenitiesMappings]);

    // Construct the query parameter string
    if (selectedAmenities.length > 0) {
      queryParams.push(`amenities=["${selectedAmenities.join('","')}"]`);
    }

    // garden surface
    if (gardenSurfaceStart > 0 && gardenSurfaceEnd > 0) {
      queryParams.push(
        `exterior_space_garden_area="${gardenSurfaceStart}-${gardenSurfaceEnd}"`
      );
    }

    // add date down sort
    queryParams.push("sort=date_down");

    const finalUrl = `${baseUrl}${queryParams.join("&")}`;
    const encodedUrl = encodeURI(finalUrl);
    setLink(finalUrl);
    console.log(finalUrl);

    const currentUser = await getUserIdFromCurrentSession();
    const API = "https://api-v2-y96au5qv3-keremcansekers-projects.vercel.app";
    const result = await fetch(`${API}/send-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: finalUrl, user: currentUser }),
      mode: "no-cors",
    });
    const data = await result.json();
    if (data.message === "success") {
      const currentUrls = await getUrls();
      if (currentUrls.data !== undefined) {
        setSendedUrls(currentUrls.data as any);
      }
    }
  }

  return (
    <main className="flex  flex-col  gap-4 p-4 lg:gap-6 lg:p-6 ">
      <div className="flex flex-1  flex-row flex-wrap  ">
        {/* <LogoutButton /> */}
        <Sheet>
          <SheetHeader className="flex  flex-row w-full justify-between">
            <SheetTitle className="p-2 font-bold hidden sm:block text-2xl">
              Make your choice
            </SheetTitle>
            <SheetTrigger asChild>
              <Button variant="outline" size="default" className="shrink-0 ">
                Toggle Filters
              </Button>
            </SheetTrigger>
          </SheetHeader>

          <SheetContent className="overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Please make the filters as per your requirement
              </SheetDescription>
            </SheetHeader>
            <RadioGroup
              onValueChange={(value) => setBuyOrRent(value as "Buy" | "Rent")}
              defaultValue="Rent"
              value={buyOrRent}
              className="flex flex-row my-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rent" id="rent" />
                <Label className="text-base" htmlFor="rent">
                  Rent
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Buy" id="Buy" />
                <Label className="text-base" htmlFor="Buy">
                  Buy
                </Label>
              </div>
            </RadioGroup>

            <div id="type_of_house" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Type of House</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialTypeOfHouseState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={typeOfHouse[key as keyof typeof typeOfHouse]}
                      onCheckedChange={(checked) => {
                        setTypeOfHouse((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {capitalizeFirstLetter(key)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 my-2">
              <Label className="text-lg">Offered since</Label>
              <RadioGroup
                onValueChange={(value) => {
                  const updatedOfferedSince: {
                    [key: string]: boolean;
                    last24Hours: boolean;
                    last3Days: boolean;
                    last5Days: boolean;
                    last10Days: boolean;
                    last30Days: boolean;
                  } = { ...States.initialOfferedSinceState };
                  updatedOfferedSince[value] = true;
                  setOfferedSince(updatedOfferedSince);
                }}
                className="flex flex-col gap-2"
              >
                {Object.keys(States.initialOfferedSinceState).map((key) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} />
                    <Label className="text-base" htmlFor={key}>
                      {capitalizeFirstLetter(key)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div id="availablity" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Available</Label>
              <div className="flex flex-col gap-2 ">
                {Object.keys(States.initialAvailableState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={available[key as keyof typeof available]}
                      onCheckedChange={(checked) => {
                        setAvailable((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {capitalizeFirstLetter(key)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div id="location" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Location</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialLocationState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      key={key}
                      checked={locationState[key as keyof typeof locationState]}
                      onCheckedChange={(checked) => {
                        setLocationState((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {fixLocationString(capitalizeFirstLetter(key))}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div id="price_range" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Price Range</Label>
              <div className="flex items-center gap-2">
                <Euro className="absolute w-4 ml-2"></Euro>
                <Input
                  type="number"
                  className="pl-6"
                  value={startPrice}
                  onChange={(event) => {
                    setStartPrice(Number(event.target.value));
                  }}
                ></Input>
                <Label className="">Until</Label>
                <Input
                  type="number"
                  value={endPrice}
                  onChange={(event) => {
                    setEndPrice(Number(event.target.value));
                  }}
                ></Input>
              </div>
            </div>
            <div id="living_area_size" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Living Area Size</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={livingAreaSizeStart}
                  onChange={(event) => {
                    setLivingAreaSizeStart(Number(event.target.value));
                  }}
                ></Input>
                <Label className="">Until</Label>
                <Input
                  type="number"
                  value={livingAreaSizeEnd}
                  onChange={(event) => {
                    setLivingAreaSizeEnd(Number(event.target.value));
                  }}
                ></Input>
              </div>
            </div>
            <div id="plot_area_size" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Plot Area Size</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={plotAreaSizeStart}
                  onChange={(event) => {
                    setPlotAreaSizeStart(Number(event.target.value));
                  }}
                ></Input>
                <Label className="">Until</Label>
                <Input
                  type="number"
                  value={plotAreaSizeEnd}
                  onChange={(event) => {
                    setPlotAreaSizeEnd(Number(event.target.value));
                  }}
                ></Input>
              </div>
            </div>
            <div id="number_of_rooms" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Number of Rooms</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={numberofRoomsStart}
                  onChange={(event) => {
                    setNumberofRoomsStart(Number(event.target.value));
                  }}
                ></Input>
                <Label className="">Until</Label>
                <Input
                  type="number"
                  value={numberofRoomsEnd}
                  onChange={(event) => {
                    setNumberofRoomsEnd(Number(event.target.value));
                  }}
                ></Input>
              </div>
            </div>
            <div id="number_of_bedrooms" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Number of Bedrooms</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={numberOfBedroomsStart}
                  onChange={(event) => {
                    setNumberOfBedroomsStart(Number(event.target.value));
                  }}
                ></Input>
                <Label className="">Until</Label>
                <Input
                  type="number"
                  value={numberOfBedroomsEnd}
                  onChange={(event) => {
                    setNumberOfBedroomsEnd(Number(event.target.value));
                  }}
                ></Input>
              </div>
            </div>
            <div id="garden_surface" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Garden Surface</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={gardenSurfaceStart}
                  onChange={(event) => {
                    setGardenSurfaceStart(Number(event.target.value));
                  }}
                ></Input>
                <Label className="">Until</Label>
                <Input
                  type="number"
                  value={gardenSurfaceEnd}
                  onChange={(event) => {
                    setGardenSurfaceEnd(Number(event.target.value));
                  }}
                ></Input>
              </div>
            </div>
            <div id="garage_capacity" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Garage Capacity</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={garageCapacityStart}
                  onChange={(event) => {
                    setGarageCapacityStart(Number(event.target.value));
                  }}
                ></Input>
                <Label className="">Until</Label>
                <Input
                  type="number"
                  value={garageCapacityEnd}
                  onChange={(event) => {
                    setGarageCapacityEnd(Number(event.target.value));
                  }}
                ></Input>
              </div>
            </div>
            <div id="energy_label" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Energy Label</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialEnegyLabelState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={energyLabel[key as keyof typeof energyLabel]}
                      onCheckedChange={(checked) => {
                        setEnergyLabel((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {capitalizeFirstLetter(key)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div id="outdoor_space" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Outdoor Space</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialOutdoorSpaceState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={outdoorSpace[key as keyof typeof outdoorSpace]}
                      onCheckedChange={(checked) => {
                        setOutdoorSpace((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {capitalizeFirstLetter(key)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div id="garden_location" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Garden Location</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialGardenLocationState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={
                        gardenLocation[key as keyof typeof gardenLocation]
                      }
                      onCheckedChange={(checked) => {
                        setgardenLocation((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {capitalizeFirstLetter(key)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div id="type_of_construction" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Type of Construction</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialConstructionTypeState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={
                        constructionType[key as keyof typeof constructionType]
                      }
                      onCheckedChange={(checked) => {
                        setConstructionType((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {fixLocationString(capitalizeFirstLetter(key))}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div id="properties" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Properties</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialPropertiesState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={properties[key as keyof typeof properties]}
                      onCheckedChange={(checked) => {
                        setProperties((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {fixLocationString(capitalizeFirstLetter(key))}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div id="garage" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Garage</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.initialGarageState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={garage[key as keyof typeof garage]}
                      onCheckedChange={(checked) => {
                        setGarage((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {fixLocationString(capitalizeFirstLetter(key))}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div id="construction_period" className="flex flex-col gap-2 my-4">
              <Label className="text-lg">Construction Period</Label>
              <div className="flex flex-col gap-2">
                {Object.keys(States.constructionPeriodState).map((key) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={key}
                      checked={
                        constructionPeriod[
                          key as keyof typeof constructionPeriod
                        ]
                      }
                      onCheckedChange={(checked) => {
                        setConstructionPeriod((prev) => ({
                          ...prev,
                          [key]: checked,
                        }));
                      }}
                    >
                      {capitalizeFirstLetter(key)}
                    </Checkbox>
                    <Label className="text-base" htmlFor={key}>
                      {parseConstructionPeriodState(capitalizeFirstLetter(key))}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Button className="w-min" onClick={generateLink}>
        Apply Filters
      </Button>

      {link.length > 0 && <p className="text-base">{link}</p>}

      {returnedData.length > 0 && <p className="text-base">{returnedData}</p>}

      {sendedUrls.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label className="text-lg">Sended Urls</Label>
          {sendedUrls.map((url) => (
            <p className="text-base">{url}</p>
          ))}
        </div>
      )}
    </main>
  );
}

function capitalizeFirstLetter(string: any) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function fixLocationString(location: any) {
  // Split the string at each capital letter
  const words = location.match(/[A-Z][a-z]+/g);

  // If words array is empty or undefined, return the original string
  if (!words || words.length === 0) {
    return location;
  }

  // Capitalize the first word and join the rest with space
  return words
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseConstructionPeriodState(state: any): string {
  const words = state
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words
    .replace(/([A-Z])(\d)/g, "$1 $2") // Add space between capital letter and digit
    .replace(/(\d)([a-z])/g, "$1 $2") // Add space between digit and lowercase letter
    .replace(/(\d)([A-Z])/g, "$1 $2") // Add space between digit and capital letter
    .toLowerCase() // Convert to lowercase
    .replace(/^./, (str: any) => str.toUpperCase()); // Capitalize first letter

  return words;
}
