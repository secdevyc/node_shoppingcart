var stripe = Stripe('pk_test_DqbXltez28XFSkBQLx6c6fxj00mk7jAD8g');

var $form = $('#checkout-form');

$form.submit(function(event) {
  $form.find('button').prop('disables', true);
  Stripe.card.createToken({
    
  })
})
