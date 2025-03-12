import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import AwesomeButton from "react-native-really-awesome-button";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { database, ref, set, get, update } from "../firebaseConfig";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  cancelAnimation,
  runOnJS,
} from "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

import * as ScreenOrientation from "expo-screen-orientation";

const cardImages = [
  { id: 1, name: "AC", src: require("../assets/images/playing-cards/AC.png") },
  { id: 2, name: "JC", src: require("../assets/images/playing-cards/JC.png") },
  { id: 3, name: "KC", src: require("../assets/images/playing-cards/KC.png") },
  { id: 4, name: "QC", src: require("../assets/images/playing-cards/QC.png") },
  { id: 5, name: "2C", src: require("../assets/images/playing-cards/2C.png") },
  { id: 6, name: "3C", src: require("../assets/images/playing-cards/3C.png") },
  { id: 7, name: "4C", src: require("../assets/images/playing-cards/4C.png") },
  { id: 8, name: "5C", src: require("../assets/images/playing-cards/5C.png") },
  { id: 9, name: "6C", src: require("../assets/images/playing-cards/6C.png") },
  { id: 10, name: "7C", src: require("../assets/images/playing-cards/7C.png") },
  { id: 11, name: "8C", src: require("../assets/images/playing-cards/8C.png") },
  { id: 12, name: "9C", src: require("../assets/images/playing-cards/9C.png") },
  {
    id: 13,
    name: "10C",
    src: require("../assets/images/playing-cards/10C.png"),
  },

  { id: 14, name: "AD", src: require("../assets/images/playing-cards/AD.png") },
  { id: 15, name: "JD", src: require("../assets/images/playing-cards/JD.png") },
  { id: 16, name: "KD", src: require("../assets/images/playing-cards/KD.png") },
  { id: 17, name: "QD", src: require("../assets/images/playing-cards/QD.png") },
  { id: 18, name: "2D", src: require("../assets/images/playing-cards/2D.png") },
  { id: 19, name: "3D", src: require("../assets/images/playing-cards/3D.png") },
  { id: 20, name: "4D", src: require("../assets/images/playing-cards/4D.png") },
  { id: 21, name: "5D", src: require("../assets/images/playing-cards/5D.png") },
  { id: 22, name: "6D", src: require("../assets/images/playing-cards/6D.png") },
  { id: 23, name: "7D", src: require("../assets/images/playing-cards/7D.png") },
  { id: 24, name: "8D", src: require("../assets/images/playing-cards/8D.png") },
  { id: 25, name: "9D", src: require("../assets/images/playing-cards/9D.png") },
  {
    id: 26,
    name: "10D",
    src: require("../assets/images/playing-cards/10D.png"),
  },

  { id: 27, name: "AH", src: require("../assets/images/playing-cards/AH.png") },
  { id: 28, name: "JH", src: require("../assets/images/playing-cards/JH.png") },
  { id: 29, name: "KH", src: require("../assets/images/playing-cards/KH.png") },
  { id: 30, name: "QH", src: require("../assets/images/playing-cards/QH.png") },
  { id: 31, name: "2H", src: require("../assets/images/playing-cards/2H.png") },
  { id: 32, name: "3H", src: require("../assets/images/playing-cards/3H.png") },
  { id: 33, name: "4H", src: require("../assets/images/playing-cards/4H.png") },
  { id: 34, name: "5H", src: require("../assets/images/playing-cards/5H.png") },
  { id: 35, name: "6H", src: require("../assets/images/playing-cards/6H.png") },
  { id: 36, name: "7H", src: require("../assets/images/playing-cards/7H.png") },
  { id: 37, name: "8H", src: require("../assets/images/playing-cards/8H.png") },
  { id: 38, name: "9H", src: require("../assets/images/playing-cards/9H.png") },
  {
    id: 39,
    name: "10H",
    src: require("../assets/images/playing-cards/10H.png"),
  },

  { id: 40, name: "AS", src: require("../assets/images/playing-cards/AS.png") },
  { id: 41, name: "JS", src: require("../assets/images/playing-cards/JS.png") },
  { id: 42, name: "KS", src: require("../assets/images/playing-cards/KS.png") },
  { id: 43, name: "QS", src: require("../assets/images/playing-cards/QS.png") },
  { id: 44, name: "2S", src: require("../assets/images/playing-cards/2S.png") },
  { id: 45, name: "3S", src: require("../assets/images/playing-cards/3S.png") },
  { id: 46, name: "4S", src: require("../assets/images/playing-cards/4S.png") },
  { id: 47, name: "5S", src: require("../assets/images/playing-cards/5S.png") },
  { id: 48, name: "6S", src: require("../assets/images/playing-cards/6S.png") },
  { id: 49, name: "7S", src: require("../assets/images/playing-cards/7S.png") },
  { id: 50, name: "8S", src: require("../assets/images/playing-cards/8S.png") },
  { id: 51, name: "9S", src: require("../assets/images/playing-cards/9S.png") },
  {
    id: 52,
    name: "10S",
    src: require("../assets/images/playing-cards/10S.png"),
  },
];

const CARD_HEIGHT = 230;
const SLOT_WIDTH = 162;
const INITIAL_SPEED = 90; // Faster movement initially
const SLOW_DOWN_DURATION = 1000; // Smooth transition to final image
const SLOT_COUNT = 3;

// Function to shuffle an array randomly
const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [slotSpinning, setslotSpinning] = useState(false);
  const [shuffledSlots, setShuffledSlots] = useState(
    Array(SLOT_COUNT).fill([])
  );
  const [finalImages, setFinalImages] = useState(Array(SLOT_COUNT).fill(null));
  const [stoppedSlots, setStoppedSlots] = useState(
    Array(SLOT_COUNT).fill(false)
  );
  const [isFetching, setIsFetching] = useState(true);

  const [betAmount, setBetAmount] = useState(0);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const translateYs = Array(SLOT_COUNT)
    .fill(null)
    .map(() => useSharedValue(0));

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    changeScreenOrientation();
    const newShuffledSlots = shuffledSlots.map(() => shuffleArray(cardImages));
    setShuffledSlots(newShuffledSlots);
    // initData();

    prepare();
  }, []);

  // const setInitialCards = () => {
  //   let initialCardsArr = [
  //     cardImages[Math.floor(Math.random() * 52)], // Example final images
  //     cardImages[Math.floor(Math.random() * 52)],
  //     cardImages[Math.floor(Math.random() * 52)],
  //   ];
  // };

  const spinSlot = () => {
    setslotSpinning(true);
    const newShuffledSlots = shuffledSlots.map(() => shuffleArray(cardImages));
    setShuffledSlots(newShuffledSlots);

    // Start infinite animation for all slots
    newShuffledSlots.forEach((shuffled, index) => {
      translateYs[index].value = withRepeat(
        withTiming(-CARD_HEIGHT * shuffled.length, {
          duration: INITIAL_SPEED * shuffled.length,
        }),
        -1,
        false
      );
    });

    // Simulate fetching data from server (replace with actual API call)
    setTimeout(() => {
      fetchFinalImagesFromServer().then((chosenFinalImages) => {
        console.log("chosenFinalImages", chosenFinalImages);
        if (chosenFinalImages) {
          setFinalImages(chosenFinalImages);
          setIsFetching(false); // Mark as received
          stopSlotsSequentially(chosenFinalImages, newShuffledSlots);
        }
      });
    }, 5000); // Simulated delay before stopping slots
  };

  const fetchFinalImagesFromServer = async () => {
    try {
      const userRefs = [
        ref(database, "slot/1"),
        ref(database, "slot/2"),
        ref(database, "slot/3"),
      ];

      // Fetch all snapshots in parallel
      const snapshots = await Promise.all(
        userRefs.map((userRef) => get(userRef))
      );

      let finalCards = [];

      snapshots.forEach((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          console.log(data);
          const matchingImage = cardImages.find((img) => img.name === data);
          if (matchingImage) {
            finalCards.push(matchingImage);
          }
        }
      });

      return finalCards; // Ensures all values are collected before returning
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const stopSlotsSequentially = (finalImages: any[], shuffledSlots: any[]) => {
    finalImages.forEach((finalImage, index) => {
      setTimeout(() => {
        cancelAnimation(translateYs[index]);

        const finalIndex = shuffledSlots[index].findIndex(
          (img) => img === finalImage
        );
        const finalOffset = -CARD_HEIGHT * finalIndex;

        translateYs[index].value = withTiming(
          finalOffset,
          { duration: SLOW_DOWN_DURATION },
          () => {
            runOnJS(setStoppedSlots)((prev) => {
              const newStopped = [...prev];
              newStopped[index] = true;
              return newStopped;
            });
          }
        );
      }, index * 1000); // Delay each stop by 1 second
    });

    setTimeout(() => {
      setslotSpinning(false);
    }, 4000);
  };

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }

  async function prepare() {
    await SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      SplashScreen.hideAsync();
      setShowSplash(false);
    }, 2000); // Hide after 2 seconds
  }

  // if (!loaded) {
  //   return null;
  // }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {!showSplash && (
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "red",
          }}
        >
          <ImageBackground
            source={require("../assets/images/play_back2.png")}
            style={{ flex: 1 }}
          >
            <Image
              source={require("../assets/images/text.png")}
              style={{
                position: "absolute",
                top: -26,
                left: "34%",
                // height: 90,
                width: "35%",
                objectFit: "contain",
              }}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  marginBottom: 30,
                }}
              >
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                  <AwesomeButton
                    backgroundColor="#911f12"
                    backgroundDarker="#7a2016"
                    width={80}
                    height={50}
                    onPress={() => {
                      setBetAmount((prevCount) => prevCount + 100);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "yellow",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      +100
                    </Text>
                  </AwesomeButton>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                  <AwesomeButton
                    backgroundColor="#911f12"
                    backgroundDarker="#7a2016"
                    width={80}
                    height={50}
                    onPress={() => {
                      setBetAmount((prevCount) => prevCount + 1000);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "yellow",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      +1000
                    </Text>
                  </AwesomeButton>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                  <AwesomeButton
                    backgroundColor="#911f12"
                    backgroundDarker="#7a2016"
                    width={82}
                    height={50}
                    onPress={() => {
                      setBetAmount((prevCount) => prevCount + 10000);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "yellow",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      +10000
                    </Text>
                  </AwesomeButton>
                </View>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  height: "75%",
                  borderColor: "#3C0805",
                  borderWidth: 6,
                  borderRadius: 10,
                  backgroundColor: "#911f12",
                  alignSelf: "flex-end",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {Array.from({ length: SLOT_COUNT }, (_, slotIndex) => (
                    <View key={slotIndex} style={styles.slotContainer}>
                      {stoppedSlots[slotIndex] ? (
                        <Image
                          source={finalImages[slotIndex]?.src}
                          style={styles.card}
                        />
                      ) : (
                        <Animated.View
                          style={[
                            useAnimatedStyle(() => ({
                              transform: [
                                { translateY: translateYs[slotIndex].value },
                              ],
                            })),
                          ]}
                        >
                          {[
                            ...shuffledSlots[slotIndex],
                            ...shuffledSlots[slotIndex],
                          ].map((source, index) => (
                            <Image
                              key={index}
                              source={source.src}
                              style={styles.card}
                            />
                          ))}
                        </Animated.View>
                      )}
                    </View>
                  ))}
                  {/* <View style={styles.cardContainerz}>
                  <Image
                    source={require("../assets/images/playing-cards/2C.png")}
                    style={styles.cardImage}
                  />
                </View> */}

                  {/* <View style={styles.cardContainerz}>
                  <Image
                    source={require("../assets/images/playing-cards/2C.png")}
                    style={styles.cardImage}
                  />
                </View> */}
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "95%",
                    // marginHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderColor: "#3C0805",
                      borderWidth: 5,
                      borderRadius: 2,
                      backgroundColor: "#911f12",
                      paddingVertical: 4,
                      paddingHorizontal: 4,
                      height: 60,
                      // width: "25%",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#3C0805",
                        width: 120,
                        marginHorizontal: 5,
                        borderRadius: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "yellow", fontSize: 16 }}>
                        Bet: {betAmount}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#3C0805",
                        // width: 120,
                        marginHorizontal: 2,
                        paddingHorizontal: 6,
                        borderRadius: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setBetAmount(0);
                      }}
                    >
                      <Text style={{ color: "yellow", fontSize: 16 }}>
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderColor: "#3C0805",
                      borderWidth: 5,
                      borderRadius: 2,
                      backgroundColor: "#911f12",
                      paddingVertical: 4,
                      paddingHorizontal: 4,
                      marginLeft: 20,
                      height: 60,
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "yellow",
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Balance
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../assets/images/dollar_small.png")}
                          style={{ objectFit: "contain", width: 10 }}
                        />
                        <View
                          style={{ backgroundColor: "#3C0805", width: "60%" }}
                        >
                          <Text
                            style={{
                              color: "yellow",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            0
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "yellow",
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Last Win
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={require("../assets/images/dollar_small.png")}
                          style={{ objectFit: "contain", width: 10 }}
                        />
                        <View
                          style={{ backgroundColor: "#3C0805", width: "60%" }}
                        >
                          <Text
                            style={{
                              color: "yellow",
                              fontSize: 16,
                              fontWeight: "bold",
                            }}
                          >
                            0
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {!slotSpinning && (
                  <View
                    style={{
                      position: "absolute",
                      // top: "30%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "black",
                        textShadowColor: "yellow",
                        textShadowOffset: { width: -2, height: 2 },
                        textShadowRadius: 3,
                      }}
                    >
                      SPIN for test your LUCK!
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 15,
                }}
              >
                <TouchableOpacity style={{ marginVertical: 4 }}>
                  <Image
                    source={require("../assets/images/help.png")}
                    style={{ width: 50, height: 50, objectFit: "fill" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 4 }}>
                  <Image
                    source={require("../assets/images/share.png")}
                    style={{ width: 50, height: 50, objectFit: "fill" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 4 }}>
                  <Image
                    source={require("../assets/images/sound.png")}
                    style={{ width: 50, height: 50, objectFit: "fill" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 4 }}>
                  <Image
                    source={require("../assets/images/bonus.png")}
                    style={{ width: 50, height: 50, objectFit: "fill" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    spinSlot();
                  }}
                  style={{ marginVertical: 4 }}
                >
                  <Image
                    source={require("../assets/images/spin.png")}
                    style={{ width: 90, height: 90, objectFit: "fill" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
      {showSplash && (
        <ImageBackground
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "red",
          }}
          source={require("../assets/images/splash.png")}
        ></ImageBackground>
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  cardContainerz: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    width: 162,
    height: 230,
    marginHorizontal: 7,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 5,
    backgroundColor: "white",
  },
  cardImage: {
    objectFit: "contain",
    width: "100%",
    height: "100%",

    // objectFit: "fill",
  },
  slotContainer: {
    height: CARD_HEIGHT,
    width: SLOT_WIDTH,
    overflow: "hidden",
    // borderRadius: 10,
    // backgroundColor: "red",
  },
  card: {
    width: SLOT_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: "contain",
  },
});
