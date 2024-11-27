


import React from 'react'; 
import { Categoryinfos } from './CategoryFullinfos';
import CategoryCard from './CategoryCard'; 
import classes from './Category.module.css'
function Category() {
  return (
    <section className={classes.category_container}>

      {Categoryinfos.map((infos) => (
        <CategoryCard data={infos} />
      ))
      }
    </section>
  );
}

export default Category;









