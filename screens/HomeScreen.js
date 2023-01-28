import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import {
	UserIcon,
	ChevronDownIcon,
	MagnifyingGlassIcon,
	AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';
import * as Svg from 'react-native-svg';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
	const navigation = useNavigation();
	const [featuredCategories, setFeaturedCategories] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
			)
			.then((data) => {
				setFeaturedCategories(data);
			});
	}, []);

	return (
		<SafeAreaView style={tw`mt-10 bg-white pt-5`}>
			{/*Header */}
			<View style={tw`flex-row pb-3 items-center mx-4 ml-[8px]`}>
				<Image
					source={{
						uri: 'https://links.papareact.com/wru',
					}}
					style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
				/>
				<View style={tw`flex-1`}>
					<Text style={tw`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
					<Text style={tw`font-bold text-xl`}>
						Current Location
						<ChevronDownIcon size={20} color="#00CCBB" />
					</Text>
				</View>
				<UserIcon size={35} color="#00CCBB" />
			</View>
			{/*Search */}
			<View style={tw`flex-row items-center pb-2 mx-4`}>
				<View style={tw`flex-row flex-1 bg-gray-200 p-3`}>
					<MagnifyingGlassIcon color="gray" size={20} />
					<TextInput placeholder="Restaurants and cuisines" keyboardType="default" />
				</View>
				<AdjustmentsVerticalIcon color="#00CCBB" />
			</View>
			{/*Body */}
			<ScrollView
				style={tw`bg-gray-100`}
				contentContainerStyle={{
					paddingBottom: 100,
				}}
			>
				{/*Categories */}
				<Categories />

				{/*Featured */}

				{featuredCategories?.map((category) => (
					<FeaturedRow
						key={category._id}
						id={category._id}
						title={category.name}
						description={category.short_description}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
