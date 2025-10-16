import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import * as React from "react";
import { Image, ImageBackground, ImageSourcePropType, Text, View } from "react-native";

interface _LayoutProps {}

const TabIcon = ({
  icon,
  title,
  focused,
}: {
  icon: ImageSourcePropType;
  title: string;
  focused?: boolean;
}) => {
  return (
    <>
      {focused ? (
        <ImageBackground
          source={images.highlight as ImageSourcePropType}
          className="flex flex-row flex-1 justify-center items-center w-full min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden"
        >
          <Image source={icon} className="size-5" tintColor="#151312" />
          <Text className="text-secondary text-base font-semibold ml-2">
            {title}
          </Text>
        </ImageBackground>
      ) : (
        <View className="flex flex-row flex-1 justify-center items-center size-full mt-4">
          <Image source={icon} className="size-5" tintColor="#A8B5DB" />
        </View>
      )}
    </>
  );
};

const _Layout = (props: _LayoutProps) => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
            backgroundColor: "#0F0D23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0F0D23",
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home as ImageSourcePropType} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search as ImageSourcePropType} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save as ImageSourcePropType} title="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person as ImageSourcePropType} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
