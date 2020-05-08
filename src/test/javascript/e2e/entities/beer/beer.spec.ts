import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BeerComponentsPage, BeerDeleteDialog, BeerUpdatePage } from './beer.page-object';

const expect = chai.expect;

describe('Beer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let beerComponentsPage: BeerComponentsPage;
  let beerUpdatePage: BeerUpdatePage;
  let beerDeleteDialog: BeerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Beers', async () => {
    await navBarPage.goToEntity('beer');
    beerComponentsPage = new BeerComponentsPage();
    await browser.wait(ec.visibilityOf(beerComponentsPage.title), 5000);
    expect(await beerComponentsPage.getTitle()).to.eq('burgerApp.beer.home.title');
    await browser.wait(ec.or(ec.visibilityOf(beerComponentsPage.entities), ec.visibilityOf(beerComponentsPage.noResult)), 1000);
  });

  it('should load create Beer page', async () => {
    await beerComponentsPage.clickOnCreateButton();
    beerUpdatePage = new BeerUpdatePage();
    expect(await beerUpdatePage.getPageTitle()).to.eq('burgerApp.beer.home.createOrEditLabel');
    await beerUpdatePage.cancel();
  });

  it('should create and save Beers', async () => {
    const nbButtonsBeforeCreate = await beerComponentsPage.countDeleteButtons();

    await beerComponentsPage.clickOnCreateButton();

    await promise.all([beerUpdatePage.setNameInput('name'), beerUpdatePage.setDrinkDateInput('2000-12-31')]);

    expect(await beerUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await beerUpdatePage.getDrinkDateInput()).to.eq('2000-12-31', 'Expected drinkDate value to be equals to 2000-12-31');

    await beerUpdatePage.save();
    expect(await beerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await beerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Beer', async () => {
    const nbButtonsBeforeDelete = await beerComponentsPage.countDeleteButtons();
    await beerComponentsPage.clickOnLastDeleteButton();

    beerDeleteDialog = new BeerDeleteDialog();
    expect(await beerDeleteDialog.getDialogTitle()).to.eq('burgerApp.beer.delete.question');
    await beerDeleteDialog.clickOnConfirmButton();

    expect(await beerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
