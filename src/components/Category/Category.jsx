import React from 'react'; 
import { Categoryinfos } from './CategoryFullinfos';
import CategoryCard from './CategoryCard'; 
import classes from "../../components/Category/Category.module.css"

function Category() {
  return (
    <section className={classes.category_container}>
      {Categoryinfos.map((infos, index) => (
        <CategoryCard key={infos.id || index} data={infos} />
      ))}
    </section>
  );
}

export default Category;










