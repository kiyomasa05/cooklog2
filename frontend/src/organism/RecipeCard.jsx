import  NoImage  from '../images/no-image.png'

// まだ反映させない
export const RecipeCard = (props) => {
  const { id, } = props;
  return (
    <div>
      <Link to={`/recipe/${item.id}`} key={index} style={{ textDecoration: 'none' }}>
        <RecipesContentWrapper>
          <RecipeTitle>{item.title}</RecipeTitle>
          <RecipeImageNode src={"image_url" ? "image_url" : NoImage} />
          <time>{`${item.time_required}分`}</time>
          <Food>{`食材：${item.food}`}</Food>
          <time>{`レシピ作成日${moment(item.created_at).format('YYYY-MM-DD')}`}</time>
        </RecipesContentWrapper>
      </Link>
    </div>
  )
}
