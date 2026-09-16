import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useState } from 'react';

import {
  RangeSlider,
} from '@react-native-assets/slider';

import { products } from '../data/products';


export type CatalogFilters = {
  priceRange: [number, number];

  series: string[];
  storage: string[];
  simCards: string[];
  ram: string[];
  colors: string[];
};


type FilterPanelProps = {
  filters: CatalogFilters;

  setFilters: React.Dispatch<
    React.SetStateAction<CatalogFilters>
  >;

  minPrice: number;
  maxPrice: number;
};


type FilterKey =
  | 'series'
  | 'storage'
  | 'simCards'
  | 'ram'
  | 'colors';


function unique(values: string[]) {
  return [...new Set(values)];
}


function formatPrice(value: number) {
  return String(
    Math.round(value)
  ).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' '
  );
}


export default function FilterPanel({
  filters,
  setFilters,
  minPrice,
  maxPrice,
}: FilterPanelProps) {

  const seriesOptions =
    unique(
      products.map(
        product => product.series
      )
    );


  const storageOptions =
    unique(
      products.map(
        product => product.storage
      )
    );


  const simOptions =
    unique(
      products.map(
        product => product.simCards
      )
    );


  const ramOptions =
    unique(
      products.map(
        product => product.ram
      )
    );


  const colorOptions =
    unique(
      products.map(
        product => product.color
      )
    );


  function toggleFilter(
    key: FilterKey,
    value: string
  ) {

    const selected =
      filters[key];


    const newValues =
      selected.includes(value)

        ? selected.filter(
            item => item !== value
          )

        : [
            ...selected,
            value,
          ];


    setFilters({
      ...filters,

      [key]: newValues,
    });
  }


  return (
    <View style={styles.panel}>

      <Text style={styles.priceTitle}>
        Цена
      </Text>


      <View style={styles.sliderContainer}>

        <RangeSlider
          range={
            filters.priceRange
          }

          minimumValue={
            minPrice
          }

          maximumValue={
            maxPrice
          }

          step={100}

          minimumRange={100}

          outboundColor="#dddddd"

          inboundColor="#ffcc00"

          thumbTintColor="#ffffff"

          trackHeight={4}

          thumbSize={22}

          thumbStyle={
            styles.sliderThumb
          }

          onValueChange={range => {

            setFilters({
              ...filters,

              priceRange: [
                Math.round(
                  range[0]
                ),

                Math.round(
                  range[1]
                ),
              ],
            });

          }}
        />

      </View>

      <View style={styles.priceValues}>

        <Text style={styles.priceSide}>
          {formatPrice(
            filters.priceRange[0]
          )}{' '}
          грн
        </Text>

        <Text style={styles.priceSide}>
          {formatPrice(
            filters.priceRange[1]
          )}{' '}
          грн
        </Text>

      </View>

      <FilterSection
        title="Серия"

        options={
          seriesOptions
        }

        selected={
          filters.series
        }

        onToggle={value =>
          toggleFilter(
            'series',
            value
          )
        }
      />


      <FilterSection
        title="Встроенная память"

        options={
          storageOptions
        }

        selected={
          filters.storage
        }

        onToggle={value =>
          toggleFilter(
            'storage',
            value
          )
        }
      />


      <FilterSection
        title="Количество SIM-карт"

        options={
          simOptions
        }

        selected={
          filters.simCards
        }

        onToggle={value =>
          toggleFilter(
            'simCards',
            value
          )
        }
      />


      <FilterSection
        title="Оперативная память"

        options={
          ramOptions
        }

        selected={
          filters.ram
        }

        onToggle={value =>
          toggleFilter(
            'ram',
            value
          )
        }
      />


      <FilterSection
        title="Цвет"

        options={
          colorOptions
        }

        selected={
          filters.colors
        }

        onToggle={value =>
          toggleFilter(
            'colors',
            value
          )
        }
      />

    </View>
  );
}

type FilterSectionProps = {
  title: string;

  options: string[];

  selected: string[];

  onToggle:
    (value: string) => void;
};


function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: FilterSectionProps) {

  const [open, setOpen] =
    useState(false);


  return (
    <View style={styles.section}>

      <Pressable
        style={
          styles.sectionHeader
        }

        onPress={() =>
          setOpen(!open)
        }
      >

        <Text
          style={
            styles.sectionTitle
          }
        >
          {title}
        </Text>


        <Text
          style={
            styles.sectionArrow
          }
        >
          {open ? '⌃' : '⌄'}
        </Text>

      </Pressable>

      {open && (

        <View
          style={
            styles.options
          }
        >

          {options.map(
            option => {

              const active =
                selected.includes(
                  option
                );


              return (
                <Pressable
                  key={option}

                  style={
                    styles.optionRow
                  }

                  onPress={() =>
                    onToggle(
                      option
                    )
                  }
                >

                  <View
                    style={[
                      styles.checkbox,

                      active &&
                      styles.checkboxActive,
                    ]}
                  >

                    {active && (
                      <Text
                        style={
                          styles.check
                        }
                      >
                        ✓
                      </Text>
                    )}

                  </View>


                  <Text
                    style={
                      styles.optionText
                    }
                  >
                    {option}
                  </Text>

                </Pressable>
              );
            }
          )}

        </View>

      )}

    </View>
  );
}


const styles = StyleSheet.create({

  panel: {
    width: '100%',

    backgroundColor: '#ffffff',

    borderWidth: 1,
    borderColor: '#dddddd',

    borderRadius: 6,

    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 15,
  },


  /* PRICE */

  priceTitle: {
    color: '#222222',

    fontSize: 20,
    fontWeight: '700',

    marginBottom: 20,
  },


  sliderContainer: {
    width: '100%',

    paddingHorizontal: 3,
  },


  sliderThumb: {
    backgroundColor: '#ffffff',

    borderWidth: 3,
    borderColor: '#ffcc00',

    borderRadius: 20,
  },


  priceValues: {
    marginTop: 10,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },


  priceSide: {
    color: '#777777',

    fontSize: 13,
  },


  /* SECTIONS */

  section: {
    borderTopWidth: 1,
    borderTopColor: '#dddddd',

    marginTop: 20,

    paddingTop: 2,
  },


  sectionHeader: {
    minHeight: 55,

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },


  sectionTitle: {
    color: '#222222',

    fontSize: 18,
    fontWeight: '700',
  },


  sectionArrow: {
    color: '#6c5cff',

    fontSize: 21,

    transform: [
      {
        translateY: -2,
      },
    ],
  },


  options: {
    paddingBottom: 12,

    gap: 10,
  },


  optionRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 10,
  },


  checkbox: {
    width: 21,
    height: 21,

    borderWidth: 1,
    borderColor: '#aaaaaa',

    borderRadius: 4,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#ffffff',
  },


  checkboxActive: {
    borderColor: '#6957ff',

    backgroundColor: '#6957ff',
  },


  check: {
    color: '#ffffff',

    fontSize: 14,
    fontWeight: '700',
  },


  optionText: {
    color: '#333333',

    fontSize: 14,
  },

});